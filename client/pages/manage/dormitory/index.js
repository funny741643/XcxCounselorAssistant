// pages/manage/dormitory/index.js
const api = require("../../../config/api");
Page({
    /**
     * 页面的初始数据
     */
    data: {
        dormitoryBaseInfo: [],
        show: false,
        radio: '1',
    },

    closeDialog() {
        this.setData({ show: false });
    },

    showDialog() {
        this.setData({ show: true });
    },

    onChange(event) {
        this.setData({
          radio: event.detail,
        });
    },

    getDormitoriesData() {
        let that = this;
        wx.request({
            url: api.allDormitoriesInfo,
            data: {
                uid: wx.getStorageSync("openId"),
            },

            success: function (res) {
                const data = res.data.data;
                let dormitoryBaseInfo = data.map((item) => {
                    return {
                        ...item.dormitory,
                        dormitory_build: `${item.dormitory.apartment.slice(
                            0,
                            2
                        )}${item.dormitory.apartment_number}号楼`,
                    };
                });
                console.log("22", dormitoryBaseInfo);
                that.setData({
                    dormitoryBaseInfo,
                });
            },

            fail: function (error) {
                app.showInfo("调用接口失败");
            },
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getDormitoriesData();
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
