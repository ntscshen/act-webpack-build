require('../css/index.scss');
var EleCache = {
    // 倒计时
    $countDown: $('#countDown'),
    // 主按钮
    $mainBtn: $('#mainBtn'),
    // 底部按钮
    $bottomBuyVip: $('#bottomBuyVip'),
    // 空福袋奖励
    $dialogGiftBtn: $('#dialogGiftBtn'),
    // 我的福袋奖励
    $myGift: $('#myGift'),
    // 我的集福Tabs
    $myBlessBtn: $('#myBlessBtn'),
    // 活动规则
    $activRule: $('#activRule'),
    // 排行榜
    $sumNumber: $('#sumNumber'),
    // 我的排名
    $tabMyRank: $('#tabMyRank'),
    // 我的排名 - 空
    $noneMyRank: $('#noneMyRank'),

    // 写福字 - 弹窗
    $writeBless: $('#writeBless'),
    // 弹窗 - 规则 - rule
    $dialogRule: $('#dialogRule'),
    // 弹窗 - 奖励
    $dialogGift: $('#dialogGift'),
    // 弹窗 - 奖励 - 空
    $dialogGiftEmpty: $('#dialogGiftEmpty'),
    // 弹窗 - 写福 - 提交
    $penSubmit: $('#penSubmit'),
    // 弹窗 - 提交60S倒计时
    $getCode: $('#getCode'),

    // 图片分享入口
    $shreImgEntry: $('#shreImgEntry')
};
EleCache.$mainBtn.text('活动已结束').prop('disabled', false).off('click').css({'background-color': '#cccccc', 'color': '#fff'});
