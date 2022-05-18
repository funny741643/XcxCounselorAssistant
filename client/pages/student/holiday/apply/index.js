const api = require("../../../../config/api");
const typeMap = {
    1: "事假",
    2: "病假",
};

const outschoolMap = {
    1: "是",
    2: "否",
};
Page({
    /**
     * 页面的初始数据
     */
    data: {
        type: "1",
        outschool: "1",
        startTime: "",
        endTime: "",
        startTimeShow: false,
        endTimeShow: false,
        telephone: "",
        explain: "",
        fileList: [],
    },

    afterRead(event) {
        let that = this;
        const { file } = event.detail;
        // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
        wx.uploadFile({
            url: api.imageUpload, // 仅为示例，非真实的接口地址
            filePath: file.url,
            name: "file",
            // formData: { user: "test" },
            success(res) {
                const { fileList = [] } = that.data;
                const data = JSON.parse(res.data);
                if (data.result === 0) {
                    fileList.push({ ...data.data, deletable: true });
                    that.setData({
                        fileList,
                    });
                }
            },
        });
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

    onOutSchoolChange(event) {
        this.setData({
            outschool: event.detail,
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

    onTelephoneChange(event) {
        this.setData({
            telephone: event.detail,
        });
    },

    onExplainChange(event) {
        this.setData({
            explain: event.detail,
        });
    },

    handleSubmit() {
        const formData = {
            type: typeMap[this.data.type],
            outschool: outschoolMap[this.data.outschool],
            telephone: this.data.telephone,
            explain: this.data.explain,
            startTime: this.data.startTime,
            endTime: this.data.endTime,
            status: "待审批",
            uid: wx.getStorageSync("openId"),
            images: this.data.fileList.map((item) => item.url).join(","),
        };
        this.postHolidayApply(formData);
    },

    postHolidayApply(data) {
        console.log(data);
        wx.request({
            url: api.postHolidayApply,
            method: "POST",
            data,

            success: function (res) {
                let data = res.data;
                if (+data.result === 0) {
                    console.log(data);
                }
                wx.navigateBack({
                    delta: 1,
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
