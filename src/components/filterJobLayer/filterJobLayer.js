Component({
    properties: {
        fData: {
            type: Array,
            value: []
        }
    },
    data:{
        isShow:false,
        point:{
            x:0,
            y:0
        }
    },
    methods:{
        //展示弹框
        layerStatus:function() {
            this.setData({
                isShow: !this.data.isShow
            })
        },
        _cancelEvent:function() {
            //触发重置回调
            this.triggerEvent("cancelEvent")
        },
        _confirmEvent:function() {
            //触发确定回调
            this.triggerEvent("confirmEvent");
        },
        _getpoint:function(e){
            this.setData({
                point:{
                    x: e.changedTouches[0].clientX,
                    y: e.changedTouches[0].clientY
                }
            })
        },
        // 手滑弹层关闭弹层
        _touchmovecloseLayer:function(e){
            var endPoint = {
                x: e.changedTouches[0].clientX,
                y: e.changedTouches[0].clientY
            }
            if (endPoint.x-this.data.point.x>0){
                this.layerStatus();
            }
        }
    }
})
