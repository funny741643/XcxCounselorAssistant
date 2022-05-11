const moment = require("moment");
const employmentModel = require("../dao/employment");
const classModel = require("../dao/classes");
const studentModel = require("../dao/students");
const counselorMethods = require("./counselors");

module.exports = {
   
    publish: async function (data) {
        let { endDate, cid } = data;
        endDate = moment(endDate, "YYYY-MM-DD").format("YYYY-MM-DD");
        let publishDate = moment().format("YYYY-MM-DD");
        let status = 1;
        const query = {
            endDate,
            publishDate,
            cid,
            status,
        };
        const ret = await employmentModel.publish(query);
        return ret;
    },

    getList: async function (data) {
        let isStudent = false;
        let { cid, sid } = data;
        if (sid) {
            isStudent = true;
            let res = await classModel.getCidBySid(sid);
            cid = res[0].uid;
        }
        const ret = await employmentModel.getList(cid);
        if (isStudent) {
            for (let i = 0; i < ret.length; i++) {
                let { id } = ret[i];
                let finishedDetail = await employmentModel.getDetail(id);
                let sids = finishedDetail.map((item) => item.sid);
                if (sids.includes(sid)) {
                    ret[i].finished = true;
                } else {
                    ret[i].finished = false;
                }
            }
        }
        return ret;
    },

    addRecord: async function(data) {
        const ret = await employmentModel.addRecord(data);
        return ret;
    }
  
};
