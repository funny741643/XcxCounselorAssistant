// pages/manage/politics/index.js
const api = require("../../../config/api");
Page({
    /**
     * 页面的初始数据
     */
    data: {
        activeKey: 0,
        itemList: [],
    },

    onChange(event) {
        this.setData(
            {
                activeKey: event.detail,
            },
            function () {
                this.getStatusData();
            }
        );
    },

    goToDetail(event) { 
        wx.navigateTo({
            url: '/pages/manage/student/detail/index?id=' + event.currentTarget.dataset.id,
        });
    },

    getStatusData() {
        wx.request({
            url: api.getPoliticsStatusData,
            data: {
                uid: wx.getStorageSync("openId"),
                status: this.data.activeKey + 1,
            },
            header: { "content-type": "application/json" },
            method: "GET",
            dataType: "json",
            responseType: "text",
            success: (result) => {
                if (result.data.result === 0) {
                    this.setData({
                        itemList: result.data.data,
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
        this.getStatusData();
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
