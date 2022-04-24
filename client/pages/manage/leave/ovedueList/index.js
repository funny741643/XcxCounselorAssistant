const api = require("../../../../config/api");
Page({
    /**
     * 页面的初始数据
     */
    data: {
        overdueList: [],
    },

    goSicknote(event) {
        const { id } = event.currentTarget;
        let data = this.data.overdueList.filter((value) => {
            if (value.id == id) {
                return value;
            }
        });
        let query = JSON.stringify(data[0]);
        wx.navigateTo({
            url: `/pages/manage/leave/sickDetail/index?query=${query}`,
        });
    },

    getOverdueList() {
        wx.request({
            url: api.getOverdueList,
            data: {
                id: wx.getStorageSync("openId"),
            },
            header: { "content-type": "application/json" },
            method: "GET",
            dataType: "json",
            responseType: "text",
            success: (result) => {
                const ret = result.data;
                if (ret.result === 0) {
                    console.log(ret.data);
                    const overdueList = ret.data.map((item) => {
                        return {
                            id: item.id,
                            studentName: item.student.name,
                            studentNumber: item.student.number,
                            studentClass: item.student.classInfo.major + item.student.classInfo.class,
                            type: item.type,
                            explain: item.explain,
                            applyTime: item.applyTime.split("T")[0],
                            startTime: item.startTime.split("T")[0],
                            endTime: item.endTime.split("T")[0],
                            status: item.status,
                            telephone: item.telephone,
                            studentPhone: item.student.telephone,
                            outschool: item.outschool,
                        };
                    });
                    this.setData({
                        overdueList,
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
        this.getOverdueList();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getOverdueList();
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
