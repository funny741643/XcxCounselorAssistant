const moment = require("moment");
const holidayModel = require('../dao/holiday');

const holidayMethods = {
    holidayApply: async function (data) {
        let { startTime, endTime } = data;
        startTime = moment(startTime, "YYYY-MM-DD").format("YYYY-MM-DD");
        endTime = moment(endTime, "YYYY-MM-DD").format("YYYY-MM-DD");
        data = Object.assign({}, data, { startTime, endTime });
        const resData = await holidayModel.holidayApply(data);
        return resData;
    },
};

module.exports = holidayMethods;
