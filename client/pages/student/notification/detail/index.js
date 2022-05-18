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
    },

    signIn() {
        // qqmapsdk.reverseGeocoder({
        //     success: (res) => {
        //         console.log(res, res.result.formatted_addresses.recommend);
        //         // this.setData({
        //         // //使用res.result.formatted_address.recommend
        //         // //这是返回结果的一个属性，是对位置的标准化描述，recommended格式经过腾讯地图优化过的描述方式，更具人性化特点，如果你是使用手机定位，一般能准确地给出你所在地点的名称
        //         //     areaSelectedStr: res.result.formatted_addresses.recommend
        //         // });
        //     },
        //     fail: function(res) {
        //         console.log(res);
        //     },
        //     complete: function(res) {
        //         console.log(res);
        //     }
        // });
        wx.getLocation({
            // type: "wgs84",
            isHighAccuracy: true,
            success(res) {
                const latitude = res.latitude;
                const longitude = res.longitude;
                console.log(latitude, longitude)
                qqmapsdk.reverseGeocoder({
                    location: {
                        latitude: latitude,
                        longitude: longitude,
                    },
                    success: function (res) {
                        console.log('??',res.result);
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

        this.setData(
            {
                notification: JSON.parse(options.query),
            },
            function () {
                console.log(this.data.notification);
            }
        );
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
