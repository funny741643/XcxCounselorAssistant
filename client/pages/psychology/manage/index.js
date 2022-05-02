// pages/psychology/manage/index.js
const api = require('../../../config/api.js');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        psyList: [],
    },
    
    addTest: function () {
        console.log('???');
        wx.navigateTo({
            url: '/pages/psychology/manage/publish/index',
        });
    },

    getPsyList: function () {
        wx.request({
            url: api.getPsyList,
            data: {
                cid: wx.getStorageSync('openId'),
            },
            header: {'content-type':'application/json'},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result)=>{
                if (result.data.result === 0) {
                    let psyList = result.data.data.map(item => {
                        return {
                            id: item.id,
                            type: item.type,
                            endDate: item.endDate.split('T')[0],
                            startDate: item.startDate.split('T')[0],
                            status: item.status,
                        }
                    })
                    this.setData({
                        psyList,
                    });
                }
            },
            fail: ()=>{},
            complete: ()=>{}
        });
    },

    // contact() {
    //     wx.makePhoneCall({
    //         phoneNumber: "0931-8915625",
    //     });
    // },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getPsyList();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getPsyList()
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
