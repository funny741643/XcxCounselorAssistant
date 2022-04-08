const api = require("../../../../config/api");
Page({
    /**
     * 页面的初始数据
     */
    data: {
        applyList: [],
        name: "",
        number: "",
    },

    goSicknote(event) {
        const { id } = event.currentTarget;
        wx.navigateTo({
            url: `/pages/student/holiday/sicknote/index?id=${id}`
        })
    },

    getApplyList() {
        let that = this;
        wx.request({
            url: api.getHolidayApplysBySid,
            data: {
                uid: wx.getStorageSync("openId"),
            },
            header: { "content-type": "application/json" },
            method: "GET",
            dataType: "json",
            success: (result) => {
                let data = result.data;
                if (data.result === 0) {
                    const applyList = data.data.map((item) => {
                        return {
                            ...item,
                            startTime: item.startTime.split("T")[0],
                            endTime: item.endTime.split("T")[0],
                            applyTime: item.applyTime.split("T")[0],
                        };
                    });

                    that.setData({
                        applyList,
                    });
                }
            },
            fail: () => {
                app.showInfo("调用接口失败");
            },
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getApplyList();
        this.setData({
            name: wx.getStorageSync("detailInfo").name,
            number: wx.getStorageSync("detailInfo").number,
        });
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
