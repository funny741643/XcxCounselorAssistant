// pages/manage/work/home/index.js
const api = require("../../../../config/api");
Page({
    /**
     * 页面的初始数据
     */
    data: {
        option1: [
            { text: "全部", value: "" },
            { text: "2022", value: "2022" },
            { text: "2021", value: "2021" },
        ],
        option2: [
            { text: "全部", value: "" },
            { text: "1月", value: "1" },
            { text: "2月", value: "2" },
            { text: "3月", value: "3" },
            { text: "4月", value: "4" },
            { text: "5月", value: "5" },
            { text: "6月", value: "6" },
            { text: "7月", value: "7" },
            { text: "8月", value: "8" },
            { text: "9月", value: "9" },
            { text: "10月", value: "10" },
            { text: "11月", value: "11" },
            { text: "12月", value: "12" },
        ],
        year: "",
        month: "",
        articleList: [],
    },

    gotoDetail(event) {
        const { id } = event.currentTarget.dataset;
        wx.navigateTo({
            url: `/pages/manage/work/detail/index?id=${id}`,
        });
    },

    addArticle() {
        wx.navigateTo({
            url: "/pages/manage/work/writing/index",
        });
    },

    yearChange() {
        this.setData({
            month: "",
        });
        this.getArticleList();
    },

    monthChange() {
        if (this.data.year === "") {
            this.setData({
                month: "",
            });
            wx.showToast({
                title: "请先选择年份",
                icon: "none",
                duration: 1500,
            });
            return;
        }
        this.getArticleList();
    },

    getArticleList() {
        wx.request({
            url: api.getArticleList,
            data: {
                cid: wx.getStorageSync("openId"),
                year: this.data.year,
                month: this.data.month,
            },
            header: { "content-type": "application/json" },
            method: "GET",
            dataType: "json",
            responseType: "text",
            success: (result) => {
                if (result.data.result === 0) {
                    let articleList = result.data.data.map((item) => {
                        return {
                            ...item,
                            date: item.date.split("T")[0],
                        };
                    });
                    this.setData({
                        articleList,
                    });
                }
            },
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getArticleList();
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
