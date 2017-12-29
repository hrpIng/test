/**全局app.js**/
App({
    onLaunch: function () {
        var _this = this;
        // 获取是否开始定位数据
        // 当前缓存存在
        wx.getStorage({
            key: 'isOpenLocation',
            success: function (res) {
                _this.globalData.isShowLocationTip = res.data
            }
        })
    },
    globalData: {
        isShowLocationTip: false, //定位是否显示
        fData: [ // 底部导航信息
            {
                "text": "找工作",
                "imageIcon": "/static/images/icon/f-icon1.png",
                "activeImageIcon": "/static/images/icon/f-icon1-h.png",
                "url": "/pages/index/index"
            },
            {
                "text": "找班组",
                "imageIcon": "/static/images/icon/f-icon3.png",
                "activeImageIcon": "/static/images/icon/f-icon3-h.png",
                "url": "/pages/team/team"
            },
            {
                "text": "我的",
                "imageIcon": "/static/images/icon/f-icon4.png",
                "activeImageIcon": "/static/images/icon/f-icon4-h.png",
                "url": "/pages/logs/logs"
            }
        ]
    }
})