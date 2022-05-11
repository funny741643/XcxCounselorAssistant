// pages/student/employment/index.js
const api = require("../../../../config/api");
Page({
    /**
     * 页面的初始数据
     */
    data: {
        employmentList: [],
    },

    gotoDetail(event) {
        const { id, isfinished, status } = event.currentTarget.dataset;
        if (isfinished === true || status === "已结束") {
            wx.showToast({
                title: "该统计已完成",
                icon: "none",
                duration: 1500,
            });
        } else {
            wx.navigateTo({
                url: `/pages/student/employment/detail/index?id=${id}`,
            });
        }
    },

    getEmploymentList: function () {
        wx.request({
            url: api.getEmploymentList,
            data: {
                sid: wx.getStorageSync("openId"),
            },
            header: { "content-type": "application/json" },
            method: "GET",
            dataType: "json",
            responseType: "text",
            success: (result) => {
                if (result.data.result === 0) {
                    let employmentList = result.data.data.map((item) => {
                        return {
                            id: item.id,
                            endDate: item.endDate.split("T")[0],
                            publishDate: item.publishDate.split("T")[0],
                            status: item.status,
                            isFinished: item.finished,
                        };
                    });
                    this.setData({
                        employmentList,
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
        this.getEmploymentList();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getEmploymentList();
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
