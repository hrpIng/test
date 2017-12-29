Component({
    properties: {
        sData: {
            type: Array,
            value: []
        },
        isSearch: {
            type: Boolean,
            value: false
        }
    },
    data: {
        isShowSearch: false,
        isShow: false,
        point: {
            x: 0,
            y: 0
        }
    },
    methods: {
        layerStatus: function () {
            this.setData({
                isShow: true,
                isShowSearch: this.properties.isSearch
            })
        },
        _closeLayer: function () {
            this.setData({
                isShow: false
            })
        },
        _getpoint: function (e) {
            this.setData({
                point: {
                    x: e.changedTouches[0].clientX,
                    y: e.changedTouches[0].clientY
                }
            })
        },
        // 手滑弹层关闭弹层
        _touchmovecloseLayer: function (e) {
            var endPoint = {
                x: e.changedTouches[0].clientX,
                y: e.changedTouches[0].clientY
            }
            if (endPoint.y - this.data.point.y < 0) {
                this.setData({
                    isShow: false
                })
            }
        },
        // 选择分类
        _selectItem: function (e) {

            this.triggerEvent("selectItem", { name: e.currentTarget.dataset.name });
        }
    }
})

