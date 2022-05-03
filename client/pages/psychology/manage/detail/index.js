// pages/psychology/manage/detail/index.js
const api = require("../../../../config/api.js");
Page({
    /**
     * 页面的初始数据
     */
    data: {
        finishedStudents: [],
        notTestStudents: [],
        noDepressionStudents: [],
        mildDepressionStudents: [],
        moderateDepressionStudents: [],
        severeDepressionStudents: [],
    },

    goToDetail(event) { 
        wx.navigateTo({
            url: '/pages/manage/student/detail/index?id=' + event.currentTarget.dataset.id,
        });
    },

    initData(id) {
        wx.request({
            url: api.getPsyDetail,
            data: {
                id,
                cid: wx.getStorageSync("openId"),
            },
            header: { "content-type": "application/json" },
            method: "GET",
            dataType: "json",
            responseType: "text",
            success: (result) => {
                console.log(result);
                if (result.data.result === 0) {
                    let data = result.data.data;
                    this.setData({
                        finishedStudents: data.finishedStudents,
                        notTestStudents: data.notTestStudents,
                        noDepressionStudents: data.noDepressionStudents,
                        mildDepressionStudents: data.mildDepressionStudents,
                        moderateDepressionStudents: data.moderateDepressionStudents,
                        severeDepressionStudents: data.severeDepressionStudents,
                    });
                }
            },
            fail: () => {},
            complete: () => {},
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const { id } = options;
        this.initData(id);
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
