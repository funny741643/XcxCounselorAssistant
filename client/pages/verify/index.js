const api = require("../../config/api");
const app = getApp();

Page({
    /**
     * 页面的初始数据
     */
    data: {
        role: 1,
        isStuHidden: true,
        studentNumber: "",
        studentName: "",
        studentCollege: "",
        studentMajor: "",
        studentClass: "",
        studentApartment: "",
        studentDormitory: "",
        studentPhonenumber: "",
        counselorNumber: "",
        counselorName: "",
        counselorCollege: "",
        counselorMajor: "",
        counselorGrade: "",
        counselorPhonenumber: "",
    },

    handleRoleSelect: function (event) {
        let role = +event.target.dataset.role;
        let isStuHidden = true;
        if (role === 2) {
            isStuHidden = false;
        }
        this.setData({
            role,
            isStuHidden,
        });
    },

    handleSubmitCounselor() {
        let counselorInfo = {};
        counselorInfo.number = this.data.counselorNumber;
        counselorInfo.name = this.data.counselorName;
        counselorInfo.college = this.data.counselorCollege;
        counselorInfo.major = this.data.counselorMajor;
        counselorInfo.telephone = this.data.counselorPhonenumber;
        counselorInfo.grade = this.data.counselorGrade;
        console.log(counselorInfo);
        wx.request({
            url: api.counselorVerify,
            data: {
                uid: wx.getStorageSync("openId"),
                role: this.data.role,
                counselorInfo,
            },

            success: function (res) {
                let data = res.data;
                if (data.result === 0) {
                    const { counselorInfo, role } = data.data;
                    wx.setStorageSync("detailInfo", counselorInfo);
                    wx.setStorageSync("role", role);
                    wx.switchTab({
                        url: "/pages/home/index",
                    });
                }
            },

            fail: function (error) {
                app.showInfo("调用接口失败");
            },
        });
    },

    handleSubmitStudent() {
        let studentInfo = {};
        studentInfo.number = this.data.studentNumber;
        studentInfo.name = this.data.studentName;
        studentInfo.college = this.data.studentCollege;
        studentInfo.major = this.data.studentMajor;
        studentInfo.class = this.data.studentClass;
        studentInfo.telephone = this.data.studentPhonenumber;
        studentInfo.apartment = this.data.studentApartment;
        studentInfo.dormitory = this.data.studentDormitory;
        wx.request({
            url: api.studentVerify,
            data: {
                uid: wx.getStorageSync("openId"),
                role: this.data.role,
                studentInfo,
            },

            success: function (res) {
                let data = res.data;
                if (data.result === 0) {
                    const { studentInfo, role } = data.data;
                    wx.setStorageSync("detailInfo", studentInfo);
                    wx.setStorageSync("role", role);
                    wx.switchTab({
                        url: "/pages/home/index",
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
