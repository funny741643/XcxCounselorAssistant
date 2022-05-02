const notificationModel = require("../dao/notification");
const classModel = require("../dao/classes");
const studentMethods = require("./students");
const moment = require("moment");

module.exports = {
    publish: async function (data) {
        let { startDate, endDate } = data;
        let status = 1;
        startDate = moment(startDate, "YYYY-MM-DD").format("YYYY-MM-DD");
        endDate = moment(endDate, "YYYY-MM-DD").format("YYYY-MM-DD");
        releaseDate = moment().format("YYYY-MM-DD");
        data = Object.assign({}, data, { startDate, endDate, releaseDate, status });
        const resData = await notificationModel.publish(data);
        return resData;
    },

    getList: async function (data) {
        let { cid = "", sid = "", isUnderway = false } = data;
        let isCounselor = cid ? true : false;
        let ret;
        if (sid) {
            let res = await classModel.getCidBySid(sid);
            cid = res[0].uid;
        }
        if (isUnderway) {
            ret = await notificationModel.getUnderwayList(cid);
        } else {
            ret = await notificationModel.getList(cid);
        }

        if (isCounselor) {
            for (let i = 0; i < ret.length; i++) {
                const feedback = ret[i].feedback;
                const sids = feedback ? feedback.split(",") : null;
                const { totalStudentCounts, confirmStudentCounts, notConfirmStudents } =
                    await this.getconfirmInfo(cid, sids);
                ret[i].confirmInfo = {
                    totalStudentCounts,
                    confirmStudentCounts,
                    notConfirmStudents,
                };
            }
        }
        return ret;
    },

    async getTotalStudents(cid) {
        let totalStudents = [];
        const classes = await studentMethods.getStudentNumByUid(cid);
        classes.forEach((item) => {
            totalStudents = [...totalStudents, ...item.students];
        });
        return totalStudents;
    },

    async getconfirmInfo(cid, sids) {
        const totalStudents = await this.getTotalStudents(cid);
        let notConfirmStudents = [];
        if (sids) {
            notConfirmStudents = totalStudents.filter((item) => {
                return !sids.includes(item.uid);
            });
        } else {
            notConfirmStudents = totalStudents;
        }

        return {
            totalStudentCounts: totalStudents.length,
            confirmStudentCounts: sids ? sids.length : 0,
            notConfirmStudents,
        };
    },

    getNotificationById: async function (id) {
        let ret = await notificationModel.getNotificationById(id);
        return ret[0];
    },

    feedback: async function (data) {
        const { sid = "", id = "" } = data;
        const notification = await this.getNotificationById(id);
        let { feedback } = notification;
        feedback = feedback ? feedback + "," + sid : sid;
        const resData = await notificationModel.feedback(feedback, id);
        return resData;
    },
};
