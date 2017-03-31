var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var through = require('through2');
var request = require('request');
var jsSHA = require('jssha');
var replaceAsync = require('string-replace-async');

var colors = gutil.colors;

// 用于解析文件的正则
var regs = {
  // html 中的 img 标签
  image: /(<img.*?src=['"]?)([^'" ]*)/gi,
  // html 中的 link 标签
  css: /(<link.*?href=['"]?)([^'" ]*\.css)/gi,
  // html 中的 script 标签
  js: /(<script.*?src=['"]?)([^'" ]*\.js)/gi,
  // css 中的 url 函数
  url: /(url\(['"]?)([^'" \)]*)/gi
}

// 可解析文件类型与需要解析的正则类型的关系
var fileTypes = {
  html: ['css', 'url', 'js', 'image'],
  css: ['url'],
  image: [],
  js: []
}

// 文件扩展名对应到文件类型
var extIndex = {
  html: 'html',
  htm: 'html',
  css: 'css',
  js: 'js',
  jpeg: 'image',
  jpg: 'image',
  png: 'image',
  gif: 'image',
  bmp: 'image'
}

var mimeTypes = {
  html: 'text/html',
  htm: 'text/html',
  css: 'text/css',
  js: 'application/javascript',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  bmp: 'image/bmp'
}

// 根据文件获取文件类型
function getFileType (file){
  return extIndex[path.parse(file.path).ext.toLowerCase().slice(1)];
}

// 根据文件获取文件 MimeType
function getMimeType (file){
  return mimeTypes[path.parse(file.path).ext.toLowerCase().slice(1)];
}

// 获取文件指纹
function getHash (file) {
  var shaObj = new jsSHA('SHA-1', 'ARRAYBUFFER');
  shaObj.update(file.contents);
  return shaObj.getHash('HEX');
}


// 以文件指纹做的 CDN URL 的缓存，用于增量上传，这个缓存会输出到文件系统
var upCache = {};
var cachePath = process.cwd() + '/upcache.json';

// 用于 cssIn cssOut 等的默认值
function id (a) {
  return a;
};

if (fs.existsSync(cachePath)) {
  try {
    upCache = JSON.parse(fs.readFileSync(cachePath));
  } catch (e) {}
}

// Promise 里抛出的异常并不会让程序停止
process.on('unhandledRejection', function (err, p) {
  throw err;
});

module.exports = function (options) {
  options || (options = {});

  // 设置默认的流入流出回掉
  Object.keys(fileTypes).forEach(function(type){
    options[type + 'In'] || (options[type + 'In'] = id);
    options[type + 'Out'] || (options[type + 'Out'] = id);
  })

  // 设置默认的上传器
  if (!options.uploader){
    options.uploader = function(file){
      return new Promise(function(resolve, reject){
        var fileName = /[^\/\\]+$/.exec(file.path)[0];
        var r = request.post({
          url: 'http://upload2.lelecdn.com:8000/single_upload_tool.php'
        }, function (err, response, body) {
          if (err) {
            return reject(err);
          }
          var json = JSON.parse(body);
          if (json.file) {
            resolve(json.file);
          } else {
            return reject(json);
          }
        })
        var form = r.form();
        form.append('username', 'VisionMember');
        form.append('md5str', '2e42085ff294d393ad11961cde6da1bc');
        form.append('watermark', '0');
        form.append('compress', '85');
        form.append('channel', 'VisionMember');
        form.append('single_upload_submit', 'ok');
        form.append('single_upload_file', file.contents, {
          filename: fileName,
          contentType: 'text/plain'
        })
      })
    }
  }
  // 以文件路径作为 CDN URL 的缓存, 目的是节约 getHash 的时间，这个缓存不会输出到文件系统
  var cacheByPath = {};
  // 上传文件
  function upload (file) {
    var cached;
    // 避免创建重复同路径的上传
    if (!cacheByPath[file.path]) {
      var hash = getHash(file);
      if (!upCache[hash]) {
        upCache[hash] = {
          path: file.path
        };

        // 缓存 promise 对象
        // 因为 Promise.resolve(url) 和 Promise.resolve(promise) 提供的 then 方法都
        // 会往回掉里传入 url，调用起来并无差别
        cacheByPath[file.path] = upCache[hash].url = options.uploader(file).then(function (url) {
          url = url.replace(/^(http|https):/gi, '');
          // 缓存 URL
          cacheByPath[file.path] = upCache[hash].url = url;
          return url;
        }).catch(function(e){
            console.error(e);
            reject(new gutil.PluginError('gulp-up', file.path + ' 上传失败'));
        });
      } else {
        cached = true;
        cacheByPath[file.path] = upCache[hash].url;
      }
    } else {
      cached = true;
    }
    return Promise.resolve(cacheByPath[file.path]).then(function(url){
        gutil.log(colors.bold.green('↑'), cached ? colors.bgMagenta(' cache   ') : colors.bgYellow(' upload  '), file.path);
        return url;
      });
  };

  // 处理流里的文件
  return through.obj(function (file, encoding, callback) {

    var me = this;
    var base = file.base;

    // 解析文件
    function parse (file, fileType) {
      var dir = path.parse(file.path).dir;

      return (fileTypes[fileType]||[]).reduce(function(prev, regType){
        return prev.then(function (content) {
          return replaceAsync(content, regs[regType], function(all, begin, src){
            src = src.trim();
            // 如果不是本地路径不执行替换
            if (!src || /^(https?:|data:|blob:|\/\/)/i.test(src)){
              return Promise.resolve(all);
            }
            var loadType = regType === 'url' ? 'image' : regType;
            return load(path.resolve(dir, src), loadType).then(function(url){
              return begin + url;
            })
          })
        });
      }, Promise.resolve(file.contents));
    }

    // 加载文件
    function load (path, fileType) {
      if (!fs.existsSync(path)) {
        setTimeout(function(){
          throw new gutil.PluginError('gulp-up', '文件不存在：' + path);
        }, 0);
      }
      return new Promise(function (resolve) {
        options[fileType+'Out'](
          options[fileType+'In'](gulp.src(path))
            .pipe(through.obj(function (file, encoding, callback) {
              var self = this;
              parse(file, fileType).then(function (content) {
                file.contents = new Buffer(content);
                var limit = options[fileType + 'Limit'];
                // 小于限制的文件直接输出 DataURI
                if (limit && file.stat.size <= limit) {
                  var url = 'data:' + getMimeType(file) + ';base64,'+ file.contents.toString('base64');
                  resolve(url);
                } else {
                  upload(file).then(resolve);
                }
                self.push(file);
                if (options.output) {
                  file.base = base;
                  me.push(file);
                }
                callback();
              });
            }))
        );
      })
    }

    var fileType = getFileType(file);

    parse(file, fileType).then(function(content) {
      file.contents = new Buffer(content);
      me.push(file);
      // 除了 html 入口文件也要上传
      Promise.resolve(fileType === 'html' ? undefined : upload(file))
        .then(function(url){
          gutil.log(colors.bold.green('↑'), colors.bgGreen(' success '), file.path);
          callback();
        })
    })
  }, function(callback){
      fs.writeFileSync(cachePath, JSON.stringify(upCache, null, 2));
      callback();
  })
};
