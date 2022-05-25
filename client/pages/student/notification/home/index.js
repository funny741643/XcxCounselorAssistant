// pages/student/notification/home/index.js
const api = require("../../../../config/api");
Page({
    /**
     * 页面的初始数据
     */
    data: {
        notificationList: [],
    },

    gotoDetail(event) {
        const id = event.currentTarget.dataset.id;
        const item = this.data.notificationList.filter((item) => {
            return item.id == id;
        });
        const data = JSON.stringify(item[0]);
        if (item[0].status === "已结束") {
            wx.showToast({
                title: "该通知已结束",
                duration: 1500,
                mask: false,
            });
        } else {
            wx.navigateTo({
                url: "/pages/student/notification/detail/index?query=" + data,
            });
        }
    },

    initData() {
        wx.request({
            url: api.getNotificationList,
            data: {
                sid: wx.getStorageSync("openId"),
            },
            header: { "content-type": "application/json" },
            method: "GET",
            dataType: "json",
            responseType: "text",
            success: (result) => {
                if (result.data.result === 0) {
                    let notificationList = result.data.data.map((item) => {
                        let isConfirm = false;
                        if (item.feedback) {
                            const feedbacks = item.feedback.split(",");
                            isConfirm = feedbacks.includes(wx.getStorageSync("openId")) ? true : false;
                        }
                        return {
                            ...item,
                            isConfirm,
                            startDate: item.startDate.split("T")[0],
                            endDate: item.endDate.split("T")[0],
                            releaseDate: item.releaseDate.split("T")[0],
                        };
                    });
                    this.setData({
                        notificationList,
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
        this.initData();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.initData();
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
