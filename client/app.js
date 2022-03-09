const api = require("./config/api");
// app.js
App({
    onLaunch: function () {
        console.log('启动~')
        let that = this;
        that.checkLoginStatus();
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
                        that.showInfo("缓存信息缺失");
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
                    /*
                     * @desc: 获取用户信息 期望数据如下
                     *
                     * @param: userInfo       [Object]
                     * @param: rawData        [String]
                     * @param: signature      [String]
                     * @param: encryptedData  [String]
                     * @param: iv             [String]
                     **/
                    wx.getUserInfo({
                        withCredentials: true,

                        success: function (infoRes) {
                            wx.request({
                                url: api.loginUrl,

                                data: {
                                    code: loginRes.code, // 临时登录凭证
                                    rawData: infoRes.rawData, // 用户非敏感信息
                                    signature: infoRes.signature, // 签名
                                    encryptedData: infoRes.encryptedData, // 用户敏感信息
                                    iv: infoRes.iv, // 解密算法的向量
                                },

                                success: function (res) {
                                    console.log("login success", res);
                                    res = res.data;

                                    if (res.result == 0) {
                                        that.globalData.userInfo = res.userInfo;
                                        wx.setStorageSync(
                                            "userInfo",
                                            JSON.stringify(res.userInfo)
                                        );
                                        wx.setStorageSync(
                                            "loginFlag",
                                            res.skey
                                        );
                                        callback();
                                    } else {
                                        that.showInfo(res.errmsg);
                                    }
                                },

                                fail: function (error) {
                                    that.showInfo("调用接口失败");
                                    console.log(error);
                                },
                            });
                        },

                        fail: function (error) {
                            // 获取 userInfo 失败，去检查是否未开启权限
                            wx.hideLoading();
                            that.checkUserInfoPermission();
                        },
                    });
                } else {
                    // 获取code失败
                    that.showInfo("登录失败");
                    console.log("调用wx.login获取code失败");
                }
            },

            fail: function (error) {},
        });
    },

    // 检查用户信息授权设置
    checkUserInfoPermission: function (callback = () => {}) {
        wx.getSetting({
            success: function (res) {
                if (!res.authSetting["scope.userInfo"]) {
                    wx.openSetting({
                        success: function (authSetting) {
                            console.log(authSetting);
                        },
                    });
                }
            },

            fail: function (error) {
                console.log(error);
            },
        });
    },

    getLoginFlag: function () {
        return wx.getStorageSync("loginFlag");
    },

    // 封装 wx.showToast 方法
    showInfo: function (info = "error", icon = "none") {
        wx.showToast({
            title: info,
            icon: icon,
            duration: 1500,
            mask: true,
        });
    },

    // onLaunch() {
    //   // 展示本地存储能力
    //   const logs = wx.getStorageSync('logs') || []
    //   logs.unshift(Date.now())
    //   wx.setStorageSync('logs', logs)

    //   // 登录
    //   wx.login({
    //     success: res => {
    //       // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     }
    //   })
    // },
    globalData: {
        userInfo: null,
    },
});
