let list = { "code": 200, "msg": "ok", "results": { "total": 6, "current_page": 1, "per_page": 10, "last_page": 1, "data": [{ "id": "1", "name": "招水泥工1", "address": "福建厦门璞尚酒店项目1", "timer": "2017-12-04", "distance": "50m" }, { "id": "1", "name": "招水泥工2", "address": "福建厦门璞尚酒店项目1", "timer": "2017-12-04", "distance": "50m" }, { "id": "1", "name": "招水泥工3", "address": "福建厦门璞尚酒店项目1", "timer": "2017-12-04", "distance": "50m" }, { "id": "1", "name": "招水泥工4", "address": "福建厦门璞尚酒店项目1", "timer": "2017-12-04", "distance": "50m" }, { "id": "1", "name": "招水泥工5", "address": "福建厦门璞尚酒店项目1", "timer": "2017-12-04", "distance": "50m" }, { "id": "1", "name": "招水泥工6", "address": "福建厦门璞尚酒店项目1", "timer": "2017-12-04", "distance": "50m" }, { "id": "1", "name": "招水泥工7", "address": "福建厦门璞尚酒店项目1", "timer": "2017-12-04", "distance": "50m" }, { "id": "1", "name": "招水泥工8", "address": "福建厦门璞尚酒店项目1", "timer": "2017-12-04", "distance": "50m" }, { "id": "1", "name": "招水泥工9", "address": "福建厦门璞尚酒店项目1", "timer": "2017-12-04", "distance": "50m" }, { "id": "1", "name": "招水泥工10", "address": "福建厦门璞尚酒店项目1", "timer": "2017-12-04", "distance": "50m" }] } };

const app = getApp();
//index.js
Page({
    data: {
        currentTab: 0,  // 当前切换的tab
        winHeight: 0,   // 窗口的可视区域
        swiperHeight: 0,    // swiper的内容区域高度
        loadingHeight: 10,    // 下拉刷新的高度
        nearbyWorker: [],    // 附近的工作列表
        newWorker: [],    // 最新的工作列表
        isShowLocationTip: false, // 是否开启定位功能
        isShow: false,  // 是否显示加载
        nearbyPagingData: { // 分页数据
            pageSize: 10, // 分页条数
            page: 1
        },
        newPagingData: { // 分页数据
            pageSize: 10, // 分页条数
            page: 1
        },
        fData: [],
        isShowFilterLayer:false
    },
    onReady:function(){
        //获得dialog组件
        this.footerNav = this.selectComponent("#footerNav");
        this.filterJobLayer = this.selectComponent("#filterJobLayer");
        this.setData({
            fData: app.globalData.fData
        })
    },
    // 页面初始化 设置swiper 内容的高度
    onLoad: function () {
        var _this = this;
        // 获取是否开始定位数据
        _this.setData({
            isShowLocationTip: app.globalData.isShowLocationTip
        })

        // 获取和设置swiper的内容区域高度
        wx.createSelectorQuery().select('.swiper-tab').fields({
            size: true,
        }, function (qres) {
            wx.getSystemInfo({
                success: function (res) {
                    _this.setData({
                        swiperHeight: res.windowHeight - qres.height - qres.height * 93 / 80 + 'px'
                    })
                },
            })
        }).exec()
        // 获取附近的工作列表

        _this.setData({
            nearbyWorker: list.results.data
        })
        // wx.request({
        //     url: 'http://192.168.0.86:3030/nearbyWorkelist',
        //     success: function (res) {
        //         _this.setData({
        //             nearbyWorker: res.data.results.data
        //         })
        //     }
        // })


        // 获取最新的工作列表
        wx.request({
            url: 'http://192.168.0.86:3030/newWorkelist',
            success: function (res) {
                _this.setData({
                    newWorker: res.data.results.data
                })
            }
        })
    },
    // swiper滑动事件
    swiperChange: function (e) {
        this.setData({
            currentTab: e.detail.current
        })
    },
    // 头部tab点击事件
    swiperTabTap: function (e) {
        if (this.data.currentTab === e.target.dataset.swiperTab) {
            return false;
        }
        this.setData({
            currentTab: e.target.dataset.swiperTab
        })
    },
    // 附近的工作下拉加载
    nearbyLoading: function () {
        var _this = this;
        _this.setData({
            isShow: true
        }, function () {
            setTimeout(function () {
                _this.setData({
                    nearbyWorker: _this.data.nearbyWorker.concat(_this.data.nearbyWorker),
                    isShow: false
                })
            }, 500)
        })
    },
    // 最新的工作下拉加载
    newLoading: function () {
        var _this = this;
        _this.setData({
            isShow: true
        }, function () {
            setTimeout(function () {
                _this.setData({
                    newWorker: _this.data.newWorker.concat(_this.data.newWorker),
                    isShow: false
                })
            }, 500)
        })
    },
    // 点击开启定位
    showLocation: function () {
        var _this = this;
        wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                wx.setStorage({ key: 'isOpenLocation', data: true })
                _this.setData({
                    isShowLocationTip:true
                })
            },
            fail: function (ee) {
                wx.setStorage({ key: 'isOpenLocation', data: false })
                _this.setData({
                    isShowLocationTip: false
                })
            }
        })
    },
    // 显示条件筛选框
    showFilterLayer() {
        this.filterJobLayer.layerStatus();
    },

    // 重置回调事件
    _cancelEvent:function(){

    },
    // 确定回调事件
    _confirmEvent:function(){

    }

})
