// pages/manage/student/index.js
const api = require("../../../config/api");

Page({
    /**
     * 页面的初始数据
     */
    data: {
        mainActiveIndex: 0,
        activeId: null,
        items: [],
    },

    onClickNav({ detail = {} }) {
        this.setData({
            mainActiveIndex: detail.index || 0,
        });
    },

    onClickItem({ detail = {} }) {
        const activeId = (this.data.activeId = detail.id ? null : detail.id);

        this.setData({ activeId });
    },

    getPageItemsData() {
        let that = this;
        wx.request({
            url: api.allStudentsOfClass,
            data: {
                uid: wx.getStorageSync("openId"),
            },

            success: function (res) {
                if (res.data.result == 0) {
                    let data = res.data.data;
                    let items = data.map(item => {
                        let students = item.students;
                        let children = students.map((item) => {
                            return {
                                text: item.name,
                                id: item.uid,
                            };
                        });
                        return {
                            text: `${item.major.slice(0, 2)}${item.grade}0${
                                item.class
                            }`,
                            children
                        }
                    })
                    that.setData({
                        items,
                    });
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
        this.getPageItemsData();
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
