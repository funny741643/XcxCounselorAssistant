// pages/manage/work/detail/index.js
const api = require("../../../../config/api");
Page({
    /**
     * 页面的初始数据
     */
    data: {
        title: "",
        content: "",
        id: "",
    },

    goWriting() {
        console.log('???')
        wx.navigateTo({
            url: `/pages/manage/work/writing/index?id=${this.data.id}`,
        });
    },

    getArticleDetail() {
        wx.request({
            url: api.getArticleDetail,
            data: {
                id: this.data.id,
            },
            header: { "content-type": "application/json" },
            method: "GET",
            dataType: "json",
            responseType: "text",
            success: (result) => {
                console.log(result);
                if (result.data.result === 0) {
                    this.setData({
                        title: result.data.data.title,
                        content: result.data.data.content,
                    });
                }
            },
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const { id } = options;
        this.setData({
            id,
        });
        this.getArticleDetail();
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
