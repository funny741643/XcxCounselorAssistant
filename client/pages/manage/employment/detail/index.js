// pages/manage/employment/detail/index.js
// import * as echarts from "../../../../components/ec-canvas/echarts";
// "ec-canvas": "../../../../components/ec-canvas/ec-canvas"
const api = require("../../../../config/api");

Page({
    /**
     * 页面的初始数据
     */
    data: {
        nid: "",
        exams: [],
        exams_success: [],
        finishedStudents: [],
        notTestStudents: [],
        totalStudents: [],
        jobs: [],
        civils: [],
        jobs_notSign_students: [],
        jobs_success: [],
        jobs_notSuccess_students: [],
        ec: null,
    },

    goToDetail(event) { 
        wx.navigateTo({
            url: '/pages/manage/student/detail/index?id=' + event.currentTarget.dataset.id,
        });
    },

    getDetailDate() {
        wx.request({
            url: api.getEmploymentDetail,
            data: {
                nid: this.data.nid,
                cid: wx.getStorageSync("openId"),
            },
            header: { "content-type": "application/json" },
            method: "GET",
            dataType: "json",
            responseType: "text",
            success: (result) => {
                console.log(result);
                if (result.data.result === 0) {
                    const {
                        exams,
                        exams_success,
                        finishedStudents,
                        notTestStudents,
                        totalStudents,
                        jobs,
                        civils,
                        jobs_notSign_students,
                        jobs_success,
                        jobs_notSuccess_students,
                    } = result.data.data;
                    this.setData({
                        exams,
                        exams_success,
                        finishedStudents,
                        notTestStudents,
                        totalStudents,
                        jobs,
                        civils,
                        jobs_notSign_students,
                        jobs_success,
                        jobs_notSuccess_students,
                    });
                }
            },
            fail: () => {},
            complete: () => {},
        });
    },

    initChart(canvas, width, height, dpr) {
        const chart = echarts.init(canvas, null, {
            width: width,
            height: height,
            devicePixelRatio: dpr, // new
        });
        canvas.setChart(chart);
    
        var option = {
            backgroundColor: "#ffffff",
            series: [
                {
                    label: {
                        normal: {
                            fontSize: 14,
                        },
                    },
                    type: "pie",
                    center: ["50%", "50%"],
                    radius: ["20%", "40%"],
                    data: [
                        {
                            value: this.data.jobs.length,
                            name: "就业",
                        },
                        {
                            value: this.data.exams.length,
                            name: "考研",
                        },
                        {
                            value: this.data.civils.length,
                            name: "考公",
                        },
                    ],
                },
            ],
        };
    
        chart.setOption(option);
        return chart;
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const { id } = options;
        this.setData({
            nid: id,
        });
        this.getDetailDate();
        // this.setData({
        //     ec: {
        //         onInit: this.initChart,
        //     }
        // })
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
