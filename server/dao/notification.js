const _ = require("./query");
const $sqlQueryNotification = require("./sqlCRUD").notification;

const notificationModel = {
    publish: function (data) {
        return _.query($sqlQueryNotification.add, data); 
    },

    getList: function (cid) {
        return _.query($sqlQueryNotification.getList, cid);
    },

    getUnderwayList: function (cid) {
        return _.query($sqlQueryNotification.getUnderwayList, cid);
    },

    getNotificationById: function (id) {
        return _.query($sqlQueryNotification.getNotificationById, id);
    },

    feedback: function (id, feedback) {
        return _.query($sqlQueryNotification.feedback, [id, feedback]);
    }
};

module.exports = notificationModel;
