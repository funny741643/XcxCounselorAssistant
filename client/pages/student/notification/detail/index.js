// pages/student/notification/detail/index.js
const api = require("../../../../config/api");
const QQMapWX = require("../../../../qqmap/qqmap-wx-jssdk");
let qqmapsdk;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        notification: {},
        location: "",
        district: "",
    },

    getLocation() {
        let that = this;
        wx.getLocation({
            // type: "wgs84",
            isHighAccuracy: true,
            success(res) {
                const latitude = res.latitude;
                const longitude = res.longitude;
                qqmapsdk.reverseGeocoder({
                    location: {
                        latitude: latitude,
                        longitude: longitude,
                    },
                    success: function (res) {
                        that.setData({
                            location: res.result.address,
                            district: res.result.address_component.district,
                        });
                    },
                    fail: function (res) {
                        console.log(res);
                    },
                    complete: function (res) {
                        console.log(res);
                    },
                });
            },
        });
    },

    signIn() {
        if (this.data.district !== "长安区") {
            wx.showToast({
                title: "请到指定位置进行签到",
                icon: "none",
                duration: 1500,
            });
        } else {
            this.feedback();
        }
    },

    feedback() {
        wx.request({
            url: api.postNotificationfeedback,
            data: {
                id: this.data.notification.id,
                sid: wx.getStorageSync("openId"),
            },
            header: { "content-type": "application/json" },
            method: "POST",
            dataType: "json",
            responseType: "text",
            success: (result) => {
                if (result.data.result === 0) {
                    wx.showToast({
                        title: "确认成功",
                        icon: "success",
                        duration: 2000,
                    });
                    setTimeout(() => {
                        wx.navigateBack({
                            delta: 1,
                        });
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
        qqmapsdk = new QQMapWX({
            key: "MYGBZ-KK3KU-I4MVS-BAMKV-J3W6Z-6GBJT",
        });

        this.setData({
            notification: JSON.parse(options.query),
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
