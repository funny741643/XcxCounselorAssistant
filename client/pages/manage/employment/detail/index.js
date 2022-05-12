// pages/manage/employment/detail/index.js
import * as echarts from "../../../../components/ec-canvas/echarts";

function initChart(canvas, width, height, dpr) {
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
                        value: 100,
                        name: "就业",
                    },
                    {
                        value: 40,
                        name: "考研",
                    },
                    {
                        value: 10,
                        name: "考公",
                    },
                ],
            },
        ],
    };

    chart.setOption(option);
    return chart;
}
Page({
    /**
     * 页面的初始数据
     */
    data: {
        nid: "",
        ec: {
            onInit: initChart,
        },
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const { id } = options;
        this.setData({
            nid: id,
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
