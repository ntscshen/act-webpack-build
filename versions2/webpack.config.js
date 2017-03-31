const act_webapck_config = require('./webpack.config.lib');

// 1、大屏414活动
global.act_name = '2017-03-31-414-act-test';


if (process.env.NODE_ENV !== 'production' && process.env.NODE_DEV !== 'dev' && process.env.NODE_SERVER !== 'server') { // 上传CND
    console.log('上传CND');
    console.log('上传CND');
    module.exports = global.act_name;
} else {
    module.exports = act_webapck_config(global.act_name);
}
