/**全局app.js**/
App({
    onLaunch: function () {
        var _this = this;
        wx.getSetting({
            success:function(res){
                if (res.authSetting['scope.userInfo']){
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: function(resData) {
                            _this.globalData.userInfo = resData.userInfo;
                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(resData)
                            }
                        }
                    })
                }
                wx.getLocation({
                    success: function (res) {
                        _this.globalData.isShowLocationTip = true;
                    }
                })
            }

        })
        
    },
    globalData: {
        userInfo:{}     // 用户信息保存
    },
})