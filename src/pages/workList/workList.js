let list = { "code": 200, "msg": "ok", "results": { "total": 6, "current_page": 1, "per_page": 10, "last_page": 1, "data": [{ "id": "1", "name": "招水泥工1", "address": "福建厦门璞尚酒店项目1", "timer": "2017-12-04", "distance": "50m" }, { "id": "1", "name": "招水泥工2", "address": "福建厦门璞尚酒店项目1", "timer": "2017-12-04", "distance": "50m" }, { "id": "1", "name": "招水泥工2", "address": "福建厦门璞尚酒店项目1", "timer": "2017-12-04", "distance": "50m" }] } };

var index = require("../index/index.js");

Page({
    data: {
        loadingHeight:0,
        workList: list.results.data, // 附近的工作数据
        isShow: false,    //下拉刷新是否显示
    },
    // 附近工作下拉加载事件
    workerListLoading: function (e) {
        var _this = this;
        _this.setData({
            isShow: true
        }, function () {
            setTimeout(function () {
                _this.setData({
                    workList: _this.data.workList.concat(_this.data.workList),
                    isShow: false
                })
            }, 500)
        })
    }
})
