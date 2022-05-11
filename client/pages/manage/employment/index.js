// pages/manage/employment/index.js
const api = require("../../../config/api");
Page({
    /**
     * 页面的初始数据
     */
    data: {
        show: false,
        endTimeShow: false,
        endDate: "",
        employmentList: [],
    },

    gotoDetail(event) {
        const { id } = event.currentTarget.dataset;
        wx.navigateTo({
            url: `/pages/manage/employment/detail/index?id=${id}`,
        });
    },

    addStatistic() {
        this.setData({ show: true });
    },

    onClose() {
        this.setData({ show: false });
    },

    onConfirm() {
        this.setData({ show: false });
        this.publishEmployment();
    },

    formatDate(date) {
        date = new Date(date);
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },

    onEndTimeDisplay() {
        this.setData({
            show: false,
            endTimeShow: true,
        });
    },

    onEndTimeClose() {
        this.setData({
            show: true,
            endTimeShow: false,
        });
    },

    onEndTimeConfirm(event) {
        this.setData({
            show: true,
            endTimeShow: false,
            endDate: this.formatDate(event.detail),
        });
    },

    publishEmployment() {
        wx.request({
            url: api.insertEmployment,
            data: {
                endDate: this.data.endDate,
                cid: wx.getStorageSync("openId"),
            },
            header: { "content-type": "application/json" },
            method: "POST",
            dataType: "json",
            responseType: "text",
            success: (result) => {
                if (result.data.result === 0) {
                    wx.showToast({
                        title: "发布成功",
                        icon: "success",
                        duration: 2000,
                    });
                }
            },
            fail: () => {},
            complete: () => {},
        });
    },

    getEmploymentList: function () {
        wx.request({
            url: api.getEmploymentList,
            data: {
                cid: wx.getStorageSync("openId"),
            },
            header: { "content-type": "application/json" },
            method: "GET",
            dataType: "json",
            responseType: "text",
            success: (result) => {
                if (result.data.result === 0) {
                    let employmentList = result.data.data.map((item) => {
                        return {
                            id: item.id,
                            endDate: item.endDate.split("T")[0],
                            publishDate: item.publishDate.split("T")[0],
                            status: item.status,
                        };
                    });
                    console.log(employmentList);
                    this.setData({
                        employmentList,
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
        this.getEmploymentList();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getEmploymentList();
    },

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
