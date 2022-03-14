// pages/login/index.js
const app = getApp();
const api = require("../../config/api");

Page({
    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUseGetUserProfile: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (wx.getUserProfile) {
            this.setData({
                canIUseGetUserProfile: true,
            });
        }
    },

    getUserProfile(e) {
        wx.getUserProfile({
            desc: "展示用户信息",
            success: (res) => {
                console.log(res);
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true,
                });
                this.checkLoginStatus()
            },
        });
    },

    // 检查本地 storage 中是否有登录态标识
    checkLoginStatus: function () {
        let that = this;
        let loginFlag = wx.getStorageSync("loginFlag");
        if (loginFlag) {
            // 检查session_key是否过期
            wx.checkSession({
                success: function () {
                    let userStorageInfo = wx.getStorageSync("userInfo");
                    if (userStorageInfo) {
                        that.globalData.userInfo = JSON.parse(userStorageInfo);
                    } else {
                        app.showInfo("缓存信息缺失");
                        console.error(
                            "登录成功后将用户信息存在Storage的userStorageInfo字段中,该字段丢失"
                        );
                    }
                },
                fail: function () {
                    that.doLogin();
                },
            });
        } else {
            that.doLogin();
        }
    },

    // 登录动作
    doLogin: function (callback = () => {}) {
        let that = this;
        wx.login({
            success: function (loginRes) {
                if (loginRes.code) {
                    wx.request({
                        url: api.loginUrl,

                        data: {
                            code: loginRes.code, // 临时登录凭证
                            userInfo: that.data.userInfo
                        },

                        success: function (res) {
                            console.log(res)
                            res = res.data;

                            if (res.result == 0) {
                                app.globalData.userInfo = res.userInfo;
                                wx.setStorageSync("openId", res.uid);
                                wx.setStorageSync("loginFlag", res.skey);
                                callback();
                            } else {
                                app.showInfo(res.errmsg);
                            }
                        },

                        fail: function (error) {
                            app.showInfo("调用接口失败");
                            console.log(error);
                        },
                    });
                } else {
                    // 获取code失败
                    app.showInfo("登录失败");
                    console.log("调用wx.login获取code失败");
                }
            },

            fail: function (error) {},
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
