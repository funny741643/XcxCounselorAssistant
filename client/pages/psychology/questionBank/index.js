var app = getApp();
const api = require("../../../config/api.js");
Page({
    /**
     * 页面的初始数据
     */
    data: {
        question: [],
        items: [
            { name: "", value: "0" },
            { name: "", value: "1" },
            { name: "", value: "2" },
            { name: "", value: "3" },
        ],
        isShow: false,
        result: [],
        nowQuestion: "",
        index: null,
        checked: false,
        id: "",
        type: "",
    },

    gotoNext() {
        if (this.data.index + 1 < this.data.question.length) {
            this.data.result = this.data.result.concat(this.data.value);
            this.setData({
                nowQuestion: this.data.question[this.data.index + 1].question,
                items: this.data.question[this.data.index + 1].items,
                index: this.data.index + 1,
                checked: false
            });
        } else {
            if (this.data.result.length !== this.data.question.length) {
                this.data.result = this.data.result.concat(this.data.value);
            }
            this.handleSubmit();
        }
    },

    handleSubmit() {
        wx.request({
            url: api.addPsyResult,
            data: {
                result: this.data.result,
                sid: wx.getStorageSync("openId"),
                nid: this.data.id,
                type: this.data.type
            },
            header: {'content-type':'application/json'},
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: (result)=>{
                if (result.data.result === 0) {
                    wx.showToast({
                        title: '提交成功',
                        icon: 'none',
                        duration: 1500,
                    });
                    setTimeout(()=>{
                        wx.navigateBack({
                            delta: 1
                        });
                    })
                }
            },
            fail: ()=>{},
            complete: ()=>{}
        });
    },

    radioChange(e) {
        this.setData({
            value: e.detail.value
        })
    },

    //点击开始测试按钮后
    start() {
        //初始化data
        this.setData({
            isShow: true,
            nowQuestion: this.data.question[this.data.index].question,
            items: this.data.question[this.data.index].items,
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const {id, type} = options
        wx.showModal({
            title: "知情同意",
            content:
                "亲爱的同学：您好！以下是一些心理测量与评估问卷。心理测量与评估是临床工作的重要组成部分。为了更好的帮助到您，请您真实并且认真的完成测验，同时对自己的选择与行为负责。我们将严格遵守保密原则，对相关资料进行保密。若涉及保密例外相关情况，我们将与您充分地沟通说明。对于测验结果的解释与说明，您可自行查阅或联系心理中心，感谢您的配合。",
            confirmText: "同意",
            cancelText: "拒绝",
            success(res) {
                if (res.confirm) {
                } else if (res.cancel) {
                    wx.navigateBack({
                        delta: 1,
                    });
                }
            },
        });
        wx.showLoading({
            title: "获取题目中",
        });
        let that = this;
        wx.request({
            url: api.getPsyquestion,
            data: { type },
            method: "GET",
            header: { "content-type": "application/json" },
            success(res) {
                if (res.data.result === 0) {
                    that.setData({
                        question: res.data.data,
                    })
                }
                wx.hideLoading();
            },
        });
        this.setData({
            isShow: false,
            index: 0,
            id,
            type
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
