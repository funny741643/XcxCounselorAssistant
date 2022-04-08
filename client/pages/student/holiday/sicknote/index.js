const api = require("../../../../config/api");
Page({
    /**
     * 页面的初始数据
     */
    data: {},

    getApply(id) {
        wx.request({
            url: api.getOneHolidayApply,
            data: {
                id,
            },
            header: { "content-type": "application/json" },
            method: "GET",
            dataType: "json",
            success: (result) => {
                console.log(result);
            },
            fail: () => {
                app.showInfo("调用接口失败");
            },
            complete: () => {},
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const { id } = options;
        this.getApply(id);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
});
