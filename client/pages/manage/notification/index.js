// pages/manage/notification/index.js
const api = require("../../../config/api.js");
Page({
    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        notificationList: [],
        activityList: [],
        dailyList: [],
        signInList: [],
        show: false,
        deleteId: "",
    },

    addNotification() {
        wx.navigateTo({
            url: "/pages/manage/notification/publish/index",
        });
    },

    deleteNotification(e) {
        this.setData({
            show: true,
            deleteId: e.currentTarget.dataset.id,
        });
    },

    onConfirm(e) {
        let that = this;
        wx.request({
            url: api.deleteNotification,
            data: {
                id: this.data.deleteId,
            },
            header: {'content-type':'application/json'},
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: (result)=>{
                if (result.data.result === 0) {
                    wx.showToast({
                        title: '删除成功',
                        icon: 'success',
                        duration: 1500,
                    });
                    that.setData({
                        show: false,
                        deleteId: "",
                    });
                    that.getNotificationList();
                }
            },
            fail: ()=>{},
            complete: ()=>{}
        });
    },

    onClose(e) {
        this.setData({
            show: false,
            deleteId: "",
        });
    },

    gotoDetail(event) {
        const id = event.currentTarget.dataset.id;
        const item = this.data.notificationList.filter((item) => {
            return item.id == id;
        });
        const data = JSON.stringify(item[0]);
        wx.navigateTo({
            url: "/pages/manage/notification/detail/index?query=" + data,
        });
    },

    onChange(event) {
        // console.log(event.detail);
    },

    getNotificationList() {
        wx.request({
            url: api.getNotificationList,
            data: {
                cid: wx.getStorageSync("openId"),
            },
            header: { "content-type": "application/json" },
            method: "GET",
            dataType: "json",
            responseType: "text",
            success: (result) => {
                if (result.data.result === 0) {
                    let notificationList = result.data.data.map((item) => {
                        return {
                            ...item,
                            startDate: item.startDate.split("T")[0],
                            endDate: item.endDate.split("T")[0],
                            releaseDate: item.releaseDate.split("T")[0],
                        };
                    });
                    let activityList = notificationList.filter((item) => {
                        return item.type === "党团活动";
                    });
                    let dailyList = notificationList.filter((item) => {
                        return item.type === "日常消息";
                    });
                    let signInList = notificationList.filter((item) => {
                        return item.type === "校园签到";
                    });
                    this.setData({
                        notificationList,
                        activityList,
                        dailyList,
                        signInList,
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
        this.getNotificationList();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getNotificationList();
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
