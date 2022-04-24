const api = require('../../../../config/api')
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        applyTime: "",
        startTime: "",
        endTime: "",
        status: "",
        telephone: "",
        studentPhone: "",
        outschool: "",
        id: "",
        explain: "",
        studentClass: "",
        studentName: "",
        studentNumber: "",
        type: "",
        suggest: "",
    },

    initData(query) {
        this.setData({
            applyTime: query.applyTime,
            startTime: query.startTime,
            endTime: query.endTime,
            status: query.status,
            telephone: query.telephone,
            studentPhone: query.studentPhone,
            outschool: query.outschool,
            id: query.id,
            explain: query.explain,
            studentClass: query.studentClass,
            studentName: query.studentName,
            studentNumber: query.studentNumber,
            type: query.type,
        });
    },

    onSuggestChange(e) {
        this.setData({
            suggest: e.detail,
        })
    },

    agree() {
        wx.request({
            url: api.sickApproval,
            data: {
                id: this.data.id,
                suggest: this.data.suggest,
                isAgree: true,
            },
            header: {'content-type':'application/json'},
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: (result)=>{
                if (result.data.result === 0) {
                    wx.showToast({
                        title: '审批成功',
                        icon: 'success',
                        duration: 2000,
                    }).then(()=>{
                        wx.navigateBack({
                            delta: 1,
                        })
                    })
                }
            },
            fail: ()=>{},
            complete: ()=>{}
        });
    },

    disagree() {
        wx.request({
            url: api.sickApproval,
            data: {
                id: this.data.id,
                suggest: this.data.suggest,
                isAgree: false,
            },
            header: {'content-type':'application/json'},
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: (result)=>{
                if (result.data.result === 0) {
                    wx.showToast({
                        title: '审批成功',
                        icon: 'success',
                        duration: 2000,
                    }).then(()=>{
                        wx.navigateBack({
                            delta: 1,
                        })
                    })
                }
            },
            fail: ()=>{},
            complete: ()=>{}
        });
    },

    revocation() {
        wx.request({
            url: api.revocationApply,
            data: {
                id: this.data.id,
            },
            header: {'content-type':'application/json'},
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: (result)=>{
                if (result.data.result === 0) {
                    wx.showToast({
                        title: '销假成功',
                        icon: 'success',
                        duration: 2000,
                    }).then(()=>{
                        wx.navigateBack({
                            delta: 1,
                        })
                    })
                }
            },
            fail: ()=>{},
            complete: ()=>{}
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let { query } = options;
        query = JSON.parse(query);
        this.initData(query)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function (options) {},

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
