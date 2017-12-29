let list = { "code": 200, "msg": "ok", "results": { "total": 6, "current_page": 1, "per_page": 10, "last_page": 1, "data": [{ "id": "1", "avatar": "/static/images/team/avatar.png", "name": "小A", "address": "北京", "synopsis": "桥梁工,油漆工,砖瓦工", "distance": "50m" }, { "id": "1", "avatar": "/static/images/team/avatar.png", "name": "小A", "address": "北京", "synopsis": "桥梁工,油漆工,砖瓦工", "distance": "50m" }, { "id": "1", "avatar": "/static/images/team/avatar.png", "name": "小A", "address": "北京", "synopsis": "桥梁工,油漆工,砖瓦工", "distance": "50m" }, { "id": "1", "avatar": "/static/images/team/avatar.png", "name": "小A", "address": "北京", "synopsis": "桥梁工,油漆工,砖瓦工", "distance": "50m" }, { "id": "1", "avatar": "/static/images/team/avatar.png", "name": "小A", "address": "北京", "synopsis": "桥梁工,油漆工,砖瓦工", "distance": "50m" }, { "id": "1", "avatar": "/static/images/team/avatar.png", "name": "小A", "address": "北京", "synopsis": "桥梁工,油漆工,砖瓦工", "distance": "50m" }, { "id": "1", "avatar": "/static/images/team/avatar.png", "name": "小A", "address": "北京", "synopsis": "桥梁工,油漆工,砖瓦工", "distance": "50m" }, { "id": "1", "avatar": "/static/images/team/avatar.png", "name": "小A", "address": "北京", "synopsis": "桥梁工,油漆工,砖瓦工", "distance": "50m" }, { "id": "1", "avatar": "/static/images/team/avatar.png", "name": "小A", "address": "北京", "synopsis": "桥梁工,油漆工,砖瓦工", "distance": "50m" }, { "id": "1", "avatar": "/static/images/team/avatar.png", "name": "小A", "address": "北京", "synopsis": "桥梁工,油漆工,砖瓦工", "distance": "50m" }, { "id": "1", "avatar": "/static/images/team/avatar.png", "name": "小A", "address": "北京", "synopsis": "桥梁工,油漆工,砖瓦工", "distance": "50m" }] } }

// 招什么工
var recruitment = ["全部", "钢筋工程", "基础工程", "泥水工", "钢筋工程", "基础工程","泥水工"];
var area = ["全部", "福建", "广东", "北京", "上海", "天津", "重庆"]

const app = getApp();
//index.js
Page({
    data: {
        winHeight: 0,   // 窗口的可视区域
        swiperHeight: 0,    // swiper的内容区域高度
        loadingHeight: 10,    // 下拉刷新的高度
        nearbyWorker: [],    // 附近的工作列表
        isShowLocationTip: false, // 是否开启定位功能
        nearbyPagingData: { // 分页数据
            pageSize: 10, // 分页条数
            page: 1
        },
        noResult:true,  // 是否有搜索到结果
        fData: [],  // 底部导航数据存放
        sData:[],   // 头部弹框的数据存放
        typename: "招什么工", // 招工的名称
        areaname:"地区",  // 地区的名称
        nowSelectItem:0, // 当前是选择招工还是地区
        isShowSearch:false // 是否显示搜索框
    },
    onReady:function(){
        //获得dialog组件
        this.footerNav = this.selectComponent("#footerNav");
        this.selectLayer = this.selectComponent("#selectLayer");
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
                }
            })
        }).exec()

        _this.setData({
            nearbyWorker: list.results.data
        })
        // wx.request({
        //     url: 'http://192.168.0.86:3030/personlist',
        //     success: function (res) {
        //         console.log(res.data)
        //         _this.setData({
        //             nearbyWorker: res.data.results.data
        //         })
        //     }
        // })

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
    // 点击开启定位
    showLocation: function () {
        var _this = this;
        wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                wx.setStorage({ key: 'isOpenLocation', data: true })
                _this.setData({
                    isShowLocationTip: true
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
    // 招什么工事件
    _selectWorkeType:function(){
        this.setData({
            sData: recruitment,
            nowSelectItem:0,
            isShowSearch: false
        })
        this.selectLayer.layerStatus();
    },
    // 地区选择事件
    _selectWorkeArea:function(){
        this.setData({
            sData: area,
            nowSelectItem: 1,
            isShowSearch: false
        })
        this.selectLayer.layerStatus();
    },
    _selectItem:function(e){
        if (this.data.nowSelectItem == 0){
            this.setData({
                typename: e.detail.name
            })
        }else{
            this.setData({
                areaname: e.detail.name
            })
        }   
    },
    _searchSelect:function(){
        this.setData({
            isShowSearch:true
        })
        this.selectLayer.layerStatus();
    }
})
