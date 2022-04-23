const api = require("../../../../config/api");

Page({
    /**
     * 页面的初始数据
     */
    data: {
        id: "",
        endTime: "",
        startTime: "",
        type: "",
        explain: "",
        status: "",
        telephone: "",
        outschool: false,
        deleteDiglogShow: false,
        revocationDiglogShow: false,
    },

    showDeleteDialog() {
        this.setData({
            deleteDiglogShow: true,
        });
    },

    hideDeleteDialog() {
        this.setData({
            deleteDiglogShow: false,
        });
    },

    showRevocationDialog() {
        this.setData({
            revocationDiglogShow: true,
        });
    },

    hideDeleteDialog() {
        this.setData({
            revocationDiglogShow: false,
        });
    },

    deleteApply() {
        wx.request({
            url: api.deleteApply,
            data: {
                id: this.data.id,
            },
            header: { "content-type": "application/json" },
            method: "POST",
            dataType: "json",
            responseType: "text",
            success: (result) => {
                if (result.data.result === 0) {
                    wx.showToast({
                        title: "删除成功",
                        icon: "success",
                        duration: 2000,
                    }).then(() => {
                        wx.navigateBack({
                            delta: 1,
                        });
                    });
                }
            },
            fail: () => {},
            complete: () => {},
        });
    },

    revocationApply() {
        wx.request({
            url: api.revocationApply,
            data: {
                id: this.data.id,
            },
            header: { "content-type": "application/json" },
            method: "POST",
            dataType: "json",
            responseType: "text",
            success: (result) => {
                if (result.data.result === 0) {
                    wx.showToast({
                        title: "销假成功",
                        icon: "success",
                        duration: 2000,
                    }).then(() => {
                        wx.navigateBack({
                            delta: 1,
                        });
                    });
                }
            },
            fail: () => {},
            complete: () => {},
        });
    },

    getApply(id) {
        wx.request({
            url: api.getOneHolidayApply,
            data: {
                id,
            },
            header: { "content-type": "application/json" },
            method: "GET",
            dataType: "json",
            success: (result) => {
                let data = result.data;
                if (data.result === 0) {
                    let sickInfo = data.data;
                    this.setData({
                        name: wx.getStorageSync("detailInfo").name,
                        number: wx.getStorageSync("detailInfo").number,
                        startTime: sickInfo.startTime.split("T")[0],
                        endTime: sickInfo.endTime.split("T")[0],
                        explain: sickInfo.explain,
                        status: sickInfo.status,
                        type: sickInfo.type,
                        telephone: sickInfo.telephone,
                        outschool: sickInfo.outschool,
                    });
                }
                console.log(result);
            },
            fail: () => {
                app.showInfo("调用接口失败");
            },
            complete: () => {},
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const { id } = options;
        this.setData({
            id,
        });
        this.getApply(id);
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
