// pages/manage/notification/detail/index.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        notification: {},
    },

    goToDetail(event) { 
        wx.navigateTo({
            url: '/pages/manage/student/detail/index?id=' + event.currentTarget.dataset.id,
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const notification = JSON.parse(options.query);
        const notConfirmStudents = notification.confirmInfo.notConfirmStudents;
        this.setData(
            {
                notification,
                notConfirmStudents,
            },
            function () {
                console.log(this.data.notification, this.data.notConfirmStudents);
            }
        );
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
