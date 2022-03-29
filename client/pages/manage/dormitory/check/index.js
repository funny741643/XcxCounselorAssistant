// pages/manage/dormitory/check/index.js
const api = require("../../../../config/api");
const app = getApp();
const levelEnum = {
    1: "不达标",
    2: "达标",
    3: "优秀",
};
Page({
    /**
     * 页面的初始数据
     */
    data: {
        dId: "",
        level: "1",
        rate: 3,
        comment: "",
        records: []
    },

    onLevelChange(event) {
        this.setData({
            level: event.detail,
        })
    },

    onRateChange(event) {
        this.setData({
            rate: event.detail,
        });
    },

    onCommentChange(event) {
        this.setData({
            comment: event.detail,
        });
    },

    onHandlerCommit() {
        this.postCheckRecord();
    },

    getCheckRecordsByDid() {
        let that = this;
        wx.request({
            url: api.getCheckRecordsByDid,
            method: "GET",
            data: {
                dId: that.data.dId,
            },

            success: function (res) {
                let data = res.data;
                if (+data.result === 0) {
                    let records = data.data
                    records = records.map(item => {
                        return {
                            comment: item.comment,
                            level: item.level,
                            check_date: item.check_date.split('T')[0]
                        }
                    })
                    that.setData({
                        records
                    })
                }
            },

            fail: function (error) {
                app.showInfo("调用接口失败");
            },
        });
    },

    postCheckRecord() {
        let that = this;
        wx.request({
            url: api.postDormitoryCheckRecord,
            method: "POST",
            data: {
                dId: that.data.dId,
                level: levelEnum[+that.data.level],
                comment: that.data.comment,
                rate: that.data.rate,
            },

            success: function (res) {
                let data = res.data;
                app.showInfo(data.message);
                if (+data.result === 0) {
                    that.getCheckRecordsByDid()
                    that.setData({
                        rate: 3,
                        comment: "",
                        level: "1"
                    })
                }
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
        this.setData({
            dId: options.id,
        })
        this.getCheckRecordsByDid()
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
