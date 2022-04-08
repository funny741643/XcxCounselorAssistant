const moment = require("moment");
const holidayModel = require("../dao/holiday");
const classModel = require("../dao/classes");

const holidayMethods = {
    holidayApply: async function (data) {
        let { startTime, endTime, uid } = data;
        startTime = moment(startTime, "YYYY-MM-DD").format("YYYY-MM-DD");
        endTime = moment(endTime, "YYYY-MM-DD").format("YYYY-MM-DD");
        applyTime = moment().format("YYYY-MM-DD");
        const ret = await classModel.getCidBySid(uid);
        cid = ret[0].uid;
        data = Object.assign({}, data, { startTime, endTime, applyTime, cid });
        const resData = await holidayModel.holidayApply(data);
        return resData;
    },

    applyListBySid: async function (sid) {
        const ret = await holidayModel.applyListBySid(sid);
        return ret;
    },

    getOneApply: async function (req, res, next) {
        const { id } = req.query;
        let ret = null;
        if (id) {
            ret = await holidayModel.getOneApplyById(id)
        }
        return ret[0];
    },
};

module.exports = holidayMethods;
