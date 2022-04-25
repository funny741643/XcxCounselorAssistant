const _ = require("./query");
const $sqlQueryNotification = require("./sqlCRUD").notification;

const notificationModel = {
    publish: function (data) {
        return _.query($sqlQueryNotification.add, data); 
    }
};

module.exports = notificationModel;
