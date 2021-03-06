// pages/psychology/manage/publish/index.js
const api = require('../../../../config/api.js');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        endTimeShow: false,
        type: "1",
        endTime: "",
    },

    formatDate(date) {
        date = new Date(date);
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },

    onTypeChange(event) {
        this.setData({
            type: event.detail,
        });
    },

    onEndTimeDisplay() {
        this.setData({
            endTimeShow: true,
        });
    },

    onEndTimeClose() {
        this.setData({
            endTimeShow: false,
        });
    },

    onEndTimeConfirm(event) {
        this.setData({
            endTimeShow: false,
            endTime: this.formatDate(event.detail),
        });
    },

    publishTest() {
        wx.request({
            url: api.insertPsyTest,
            data: {
                type: this.data.type,
                endTime: this.data.endTime,
                cid: wx.getStorageSync('openId'),
            },
            header: { "content-type": "application/json" },
            method: "POST",
            dataType: "json",
            responseType: "text",
            success: (result) => {
                if (result.data.result === 0) {
                    wx.showToast({
                        title: '发布成功',
                        icon: 'success',
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
    onLoad: function (options) {},

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
