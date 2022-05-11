// pages/student/employment/detail/index.js
const api = require("../../../../config/api");
Page({
    /**
     * 页面的初始数据
     */
    data: {
        typeSelectShow: false,
        statusSelectShow: false,
        type: "",
        status: "",
        company: "",
        typeColumns: ["考研", "考公", "就业"],
        statusColumns: [
            "未有offer",
            "已有offer，未签三方",
            "已签三方，未登记",
            "已签三方，已登记",
            "考研调剂中",
            "考研二面准备中",
            "考研拟录取",
            "考研二战",
            "考公面试准备中",
            "考公拟录取",
        ],
    },

    onTypeDisplay: function () {
        this.setData({
            typeSelectShow: true,
        });
    },

    onTypeClose: function () {
        this.setData({
            typeSelectShow: false,
        });
    },

    onTypeCancel() {
        this.setData({
            typeSelectShow: false,
        });
    },

    onTypeConfirm(event) {
        const { detail } = event;
        this.setData({
            type: detail.value,
            typeSelectShow: false,
        });
    },

    onStatusDisplay: function () {
        this.setData({
            statusSelectShow: true,
        });
    },

    onStatusClose: function () {
        this.setData({
            statusSelectShow: false,
        });
    },

    onStatusCancel() {
        this.setData({
            statusSelectShow: false,
        });
    },

    onStatusConfirm(event) {
        const { detail } = event;
        this.setData({
            status: detail.value,
            statusSelectShow: false,
        });
    },

    handleSubmit: function () {
        // console.log(this.data.type, this.data.status, this.data.company);
        this.addRecord();
    },

    addRecord: function () {
        wx.request({
            url: api.addEmploymentRecord,
            data: {
                sid: wx.getStorageSync("openId"),
                company: this.data.company,
                type: this.data.type,
                status: this.data.status,
                nid: this.data.nid,
            },
            header: { "content-type": "application/json" },
            method: "POST",
            dataType: "json",
            responseType: "text",
            success: (result) => {
                if (result.data.result === 0) {
                    wx.showToast({
                        title: "添加成功",
                        icon: "success",
                        duration: 2000,
                    });
                    setTimeout(() => {
                        wx.navigateBack();
                    }, 2000);
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
        this.setData({
            nid: id,
        });
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
