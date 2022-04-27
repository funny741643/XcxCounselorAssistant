// pages/manage/notification/publish/index.js
const api = require('../../../../config/api.js');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        type: '1',
        startTime: "",
        endTime: "",
        startTimeShow: false,
        endTimeShow: false,
        content: '',
        title: '',
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

    onContentChange(event) {
        this.setData({
            content: event.detail,
        });
    },

    onTitleChange(event) {
        this.setData({
            title: event.detail,
        });
    },

    onStartTimeDisplay() {
        this.setData({
            startTimeShow: true,
        });
    },

    onStartTimeClose() {
        this.setData({
            startTimeShow: false,
        });
    },

    onStartTimeConfirm(event) {
        this.setData({
            startTimeShow: false,
            startTime: this.formatDate(event.detail),
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

    publishNotification() {
        wx.request({
            url: api.insertNotification,
            data: {
                cid: wx.getStorageSync('openId'),
                type: this.data.type,
                startDate: this.data.startTime,
                endDate: this.data.endTime,
                title: this.data.title,
                content: this.data.content,
            },
            header: {'content-type':'application/json'},
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: (result)=>{
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
            fail: ()=>{},
            complete: ()=>{}
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
