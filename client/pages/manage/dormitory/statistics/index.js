// pages/manage/dormitory/statistics/index.js
const api = require("../../../../config/api");
Page({
    /**
     * 页面的初始数据
     */
    data: {
        records: []
    },

    getCheckstatisticsByUid() {
        let that = this;
        wx.request({
            url: api.getCheckstatisticsByUid,
            method: "GET",
            data: {
                uid: wx.getStorageSync("openId"),
            },

            success: function (res) {
                let data = res.data;
                if (data.result === 0) {
                    that.setData({
                        records: data.data
                    })
                }
            },

            fail: function (error) {
                app.showInfo("调用接口失败");
            },
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getCheckstatisticsByUid()
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
