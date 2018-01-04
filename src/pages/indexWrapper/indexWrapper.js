let list = { "code": 200, "msg": "ok", "results": { "total": 6, "current_page": 1, "per_page": 10, "last_page": 1, "data": [{ "id": "1", "name": "招水泥工1", "address": "福建厦门璞尚酒店项目1", "timer": "2017-12-04", "distance": "50m" }, { "id": "1", "name": "招水泥工2", "address": "福建厦门璞尚酒店项目1", "timer": "2017-12-04", "distance": "50m" }, { "id": "1", "name": "招水泥工3", "address": "福建厦门璞尚酒店项目1", "timer": "2017-12-04", "distance": "50m" }, { "id": "1", "name": "招水泥工4", "address": "福建厦门璞尚酒店项目1", "timer": "2017-12-04", "distance": "50m" }, { "id": "1", "name": "招水泥工5", "address": "福建厦门璞尚酒店项目1", "timer": "2017-12-04", "distance": "50m" }, { "id": "1", "name": "招水泥工6", "address": "福建厦门璞尚酒店项目1", "timer": "2017-12-04", "distance": "50m" }, { "id": "1", "name": "招水泥工7", "address": "福建厦门璞尚酒店项目1", "timer": "2017-12-04", "distance": "50m" }] } };

let teamList = { "code": 200, "msg": "ok", "results": { "total": 6, "current_page": 1, "per_page": 10, "last_page": 1, "data": [{ "id": "1", "avatar": "/static/images/team/avatar.png", "name": "小A", "address": "北京", "synopsis": "桥梁工,油漆工,砖瓦工", "distance": "50m" }, { "id": "1", "avatar": "/static/images/team/avatar.png", "name": "小A", "address": "北京", "synopsis": "桥梁工,油漆工,砖瓦工", "distance": "50m" }, { "id": "1", "avatar": "/static/images/team/avatar.png", "name": "小A", "address": "北京", "synopsis": "桥梁工,油漆工,砖瓦工", "distance": "50m" }, { "id": "1", "avatar": "/static/images/team/avatar.png", "name": "小A", "address": "北京", "synopsis": "桥梁工,油漆工,砖瓦工", "distance": "50m" }] } }


// 招什么工
var recruitment = ["全部", "钢筋工程", "基础工程", "泥水工", "钢筋工程", "基础工程", "泥水工"];
var area = ["全部", "福建", "广东", "北京", "上海", "天津", "重庆"]

var index = require("../index/index.js");


var app =getApp();

Page({
    data: {
        userInfo:{}, //用户信息
        footerCurrentTab: 0,  // 当前切换的tab
        currentTab: 0,   // 找工作上面的两个tab
        nearbyWorker: list.results.data, // 附近的工作数据
        newWorker: list.results.data,   // 最新的工作数据
        isShow: false,    //下拉刷新是否显示
        typename: "招什么工", // 招工的名称
        areaname: "地区",  // 地区的名称
        nowSelectItem: 0, // 当前是选择招工还是地区
        teamList: teamList.results.data, // 找班组的数据
        sData: [],   // 头部弹框的数据存放
        isShowSearch: false // 是否显示搜索框
    },
    onReady: function () {
        this.filterJobLayer = this.selectComponent("#filterJobLayer"); // 找工作更多筛选组件
        this.selectLayer = this.selectComponent("#selectLayer");    // 找班组头部下拉组件
    },
    onLoad: function () {
        var _this = this;
        wx.request({
            url: 'http://192.168.0.86:3030/nearbyWorkelist',
            success: function (res) {
                _this.setData({
                    nearbyWorker: res.data.results.data
                })
            }
        })
        wx.request({
            url: 'http://192.168.0.86:3030/newWorkelist',
            success: function (res) {
                _this.setData({
                    newWorker: res.data.results.data
                })
            }
        })
        wx.request({
            url: 'http://192.168.0.86:3030/personlist',
            success: function (res) {
                _this.setData({
                    teamList: res.data.results.data
                })
            }
        })
    },
    // 底部菜单tab点击事件
    footerswiperTabTap: function (e) {
        var _this = this;
        if (e.currentTarget.dataset.swiperTab == 2){
            wx.getSetting({
                success:function(res){
                    if (!res.authSetting['scope.userInfo']){
                        wx.getUserInfo({
                            success: res => {
                                app.globalData.userInfo = res.userInfo
                                _this.setData({
                                    userInfo: res.userInfo
                                })
                            }
                        })
                    }else{
                        if (app.globalData.userInfo) {
                            _this.setData({
                                userInfo: app.globalData.userInfo
                            })
                            console.log(_this.data.userInfo)
                        } else if (_this.data.canIUse) {
                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            app.userInfoReadyCallback = res => {
                                _this.setData({
                                    userInfo: res.userInfo,
                                })
                            }
                        }
                    }
                }
            })
        }
        if (this.data.footerCurrentTab === e.currentTarget.dataset.swiperTab) {
            return false;
        }
        this.setData({
            footerCurrentTab: e.currentTarget.dataset.swiperTab
        })
        
    },
    // 附近工作和最近工作头部点击事件
    swiperTabTap: function (e) {
        this.setData({
            currentTab: index.init.swiperTabTap(e)
        })
    },
    // 附近工作和最近工作滑动事件
    swiperChange: function (e) {
        this.setData({
            currentTab: index.init.swiperChange(e)
        })
    },
    // 附近工作下拉加载事件
    nearbyLoading: function (e) {
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
    // 附近工作下拉加载事件
    newWorkerLoading: function (e) {
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
    // 找班组下拉加载时间
    teamLoading: function () {
        var _this = this;
        _this.setData({
            isShow: true
        }, function () {
            setTimeout(function () {
                _this.setData({
                    teamList: _this.data.teamList.concat(_this.data.teamList),
                    isShow: false
                })
            }, 500)
        })
    },
    // 找工作显示更多选择
    showFilterLayer: function () {
        this.filterJobLayer.layerStatus();
    },
    // 取消回调
    _cancelEvent: function () {
    },
    // 确定回调事件
    _confirmEvent: function () {
    },
    // 招什么工事件
    _selectWorkeType: function () {
        this.setData({
            sData: recruitment,
            nowSelectItem: 0,
            isShowSearch: false
        })
        this.selectLayer.layerStatus();
    },
    // 地区选择事件
    _selectWorkeArea: function () {
        this.setData({
            sData: area,
            nowSelectItem: 1,
            isShowSearch: false
        })
        this.selectLayer.layerStatus();
    },
    // 地区和招工选中时间
    _selectItem: function (e) {
        if (this.data.nowSelectItem == 0) {
            this.setData({
                typename: e.detail.name
            })
        } else {
            this.setData({
                areaname: e.detail.name
            })
        }
    },
    // 搜索事件
    _searchSelect: function () {
        this.setData({
            isShowSearch: true
        })
        this.selectLayer.layerStatus();
    },
    // 拨打客服电话
    callKefu: function () {
        wx.makePhoneCall({
            phoneNumber: '12345678900', 
            success: function () {
                console.log("拨打电话成功！")
            },
            fail: function () {
                console.log("拨打电话失败！")
            }
        })
    }
})
