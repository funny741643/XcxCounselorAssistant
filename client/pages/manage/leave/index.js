// pages/manage/leave/index.js
const api = require("../../../config/api");
Page({
    /**
     * 页面的初始数据
     */
    data: {
        baseData: {},
    },

    getBaseData() {
        wx.request({
            url: api.getLeaveBaseData,
            data: {
                uid: wx.getStorageSync("openId"),
            },
            header: {'content-type':'application/json'},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result)=>{
                let ret = result.data;
                if (ret.result === 0) {
                    this.setData({
                        baseData: ret.data,
                    });
                }
            },
            fail: ()=>{},
            complete: ()=>{}
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       this.getBaseData()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getBaseData()
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
