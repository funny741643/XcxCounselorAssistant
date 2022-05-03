const api = require("../../../config/api.js");
Page({
    /**
     * 页面的初始数据
     */
    data: {
        psyList: [],
    },

    gotoTest(event) {
        const { id, type, status, finished } = event.currentTarget.dataset;
        if (status === "已失效") {
            wx.showToast({
                title: "该测评已失效",
                icon: "none",
                duration: 2000,
            });
            return;
        } else if (finished) {
            wx.showToast({
                title: "您已完成了该测评",
                icon: "none",
                duration: 2000,
            });
            return;
        }
        wx.navigateTo({
            url: '/pages/psychology/questionBank/index?id=' + id + '&type=' + type,
        });
    },

    getPsyList: function () {
        wx.request({
            url: api.getPsyList,
            data: {
                sid: wx.getStorageSync("openId"),
            },
            header: { "content-type": "application/json" },
            method: "GET",
            dataType: "json",
            responseType: "text",
            success: (result) => {
                if (result.data.result === 0) {
                    let psyList = result.data.data.map((item) => {
                        return {
                            id: item.id,
                            type: item.type,
                            endDate: item.endDate.split("T")[0],
                            startDate: item.startDate.split("T")[0],
                            status: item.status,
                            finished: item.finished,
                        };
                    });
                    this.setData({
                        psyList,
                    });
                }
            },
            fail: () => {},
            complete: () => {},
        });
    },

    // contact() {
    //     wx.makePhoneCall({
    //         phoneNumber: "0931-8915625",
    //     });
    // },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getPsyList();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getPsyList();
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
