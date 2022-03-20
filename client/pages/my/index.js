// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    detailInfo: {}
  },

  onLoad() {
    this.setData({
      userInfo: wx.getStorageSync("userInfo"),
      detailInfo: wx.getStorageSync('detailInfo') 
    })
  },
})
