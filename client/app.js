App({
    onLaunch() {
        // 展示本地存储能力
        let that = this;
        let loginFlag = wx.getStorageSync("loginFlag");
        if (loginFlag) {
            wx.checkSession({
                success: function () {
                    let userStorageInfo = wx.getStorageSync("userInfo");
                    let role = wx.getStorageSync("role");
                    if (userStorageInfo) {
                        that.globalData.userInfo = userStorageInfo;
                        if (role === 0) {
                            wx.navigateTo({
                                url: "/pages/verify/index"
                            });
                        } else {
                            wx.switchTab({
                                url: "/pages/home/index",
                            });
                        }
                    } else {
                        app.showInfo("缓存信息缺失");
                        console.error(
                            "登录成功后将用户信息存在Storage的userStorageInfo字段中,该字段丢失"
                        );
                        wx.navigateTo({
                            url: "/pages/login/index"
                        });
                    }
                },

                fail: function() {
                    wx.navigateTo({
                        url: "/pages/login/index"
                    });
                }
            });
        } else {
            wx.navigateTo({
                url: "/pages/login/index"
            });
        }
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

    globalData: {
        userInfo: null,
    },
});
