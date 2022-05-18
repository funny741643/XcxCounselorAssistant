// index.js
// 获取应用实例
const app = getApp();
const api = require("../../config/api");

Page({
    data: {
        studentInfo: {},
        counselorInfo: {},
        userInfo: {},
        detailInfo: {},
        isStudent: false,
    },

    getStudentInfo() {
        wx.request({
            url: api.getStudentInfoById,
            data: {
                id: wx.getStorageSync("openId"),
            },
            header: { "content-type": "application/json" },
            method: "GET",
            dataType: "json",
            responseType: "text",
            success: (result) => {
                this.setData({
                    studentInfo: result.data.data,
                });
            },
            fail: () => {},
            complete: () => {},
        });
    },

    getCounselorInfo() {
        wx.request({
            url: api.getCounselorInfoById,
            data: {
                id: wx.getStorageSync("openId"),
            },
            header: { "content-type": "application/json" },
            method: "GET",
            dataType: "json",
            responseType: "text",
            success: (result) => {
                if (result.data.result === 0) {
                    this.setData({
                        counselorInfo: result.data.data,
                    });
                }
            },
            fail: () => {},
            complete: () => {},
        });
    },

    onLoad() {
        if (wx.getStorageSync("role") == 2) {
            this.getStudentInfo();
            this.setData({
                isStudent: true,
            });
        } else {
            this.getCounselorInfo();
        }
        this.setData({
            userInfo: wx.getStorageSync("userInfo"),
            detailInfo: wx.getStorageSync("detailInfo"),
        });
    },
});
