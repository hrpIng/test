var init = {
    setData: {
        currentTab: 0,  // 当前切换的tab
        loadingHeight: 10,    // 下拉刷新的高度
        nearbyWorker: [],    // 附近的工作列表
        newWorker: [],    // 最新的工作列表
        isShowLocationTip: false, // 是否开启定位功能
        isShow: false,  // 是否显示加载
        isShowFilterLayer: false // 旁边更多筛选是否显示
    },
    // swiper滑动事件
    swiperChange: function (e) {
        this.setData.currentTab = e.detail.current;
        return e.detail.current;
    },
    // 头部tab点击事件
    swiperTabTap: function (e) {
        if (this.setData.currentTab === e.currentTarget.dataset.swiperTab) {
            return false;
        }
        this.setData.currentTab = e.currentTarget.dataset.swiperTab
        return e.currentTarget.dataset.swiperTab
    }
};

module.exports = {
    init: init
}