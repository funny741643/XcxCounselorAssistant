// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
  },

  onLoad() {
    this.setData({
      userInfo: wx.getStorageSync("userInfo")
    })
  },
})
