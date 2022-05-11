// pages/manage/employment/detail/index.js
import * as echarts from '../../../../ec-canvas/echarts';

function initChart(canvas, width, height, dpr) {
    const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr, // new
    });
    canvas.setChart(chart);

    var option = {
        title: {
            text: "Graph 简单示例",
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        series: [
            {
                type: "graph",
                layout: "none",
                symbolSize: 50,
                roam: true,
                label: {
                    normal: {
                        show: true,
                    },
                },
                // edgeSymbol: ['circle', 'arrow'],
                // edgeSymbolSize: [4, 10],
                edgeLabel: {
                    normal: {
                        textStyle: {
                            fontSize: 20,
                        },
                    },
                },
                data: [
                    {
                        name: "节点1",
                        x: 300,
                        y: 300,
                        itemStyle: {
                            color: "#37A2DA",
                        },
                    },
                    {
                        name: "节点2",
                        x: 800,
                        y: 300,
                        itemStyle: {
                            color: "#32C5E9",
                        },
                    },
                    {
                        name: "节点3",
                        x: 550,
                        y: 100,
                        itemStyle: {
                            color: "#9FE6B8",
                        },
                    },
                    {
                        name: "节点4",
                        x: 550,
                        y: 500,
                        itemStyle: {
                            color: "#FF9F7F",
                        },
                    },
                ],
                // links: [],
                links: [
                    {
                        source: 0,
                        target: 1,
                        symbolSize: [5, 20],
                        label: {
                            normal: {
                                show: true,
                            },
                        },
                        lineStyle: {
                            normal: {
                                width: 4,
                                curveness: 0.2,
                            },
                        },
                    },
                    {
                        source: "节点2",
                        target: "节点1",
                        label: {
                            normal: {
                                show: true,
                            },
                        },
                        lineStyle: {
                            normal: { curveness: 0.2 },
                        },
                    },
                    {
                        source: "节点1",
                        target: "节点3",
                    },
                    {
                        source: "节点2",
                        target: "节点3",
                    },
                    {
                        source: "节点2",
                        target: "节点4",
                    },
                    {
                        source: "节点1",
                        target: "节点4",
                    },
                ],
                lineStyle: {
                    normal: {
                        opacity: 0.9,
                        width: 2,
                        curveness: 0,
                    },
                },
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
