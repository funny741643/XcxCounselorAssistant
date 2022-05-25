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

    addRecord: async function (data) {
        const ret = await employmentModel.addRecord(data);
        return ret;
    },

    delete: async function (data) {
        const { id } = data;
        const ret = await employmentModel.delete(id);
        return ret;
    },

    getDetail: async function (cid, nid) {
        const ret = await employmentModel.getDetail(nid);
        console.log(ret);
        // 考研
        const exams = ret.filter((item) => {
            return item.type === "考研";
        });
        // 考公
        const civils = ret.filter((item) => {
            return item.type === "考公";
        });
        // 就业
        const jobs = ret.filter((item) => {
            return item.type === "就业";
        });
        // 考研上岸
        const exams_success = ret.filter((item) => {
            return item.status === "考研拟录取";
        });
        // 已有offer
        const jobs_success = ret.filter((item) => {
            return (
                item.status === "已有offer，未签三方" ||
                item.status === "已签三方，未登记" ||
                item.status === "已签三方，已登记"
            );
        });
        // 未有offer
        const jobs_notSuccess = ret.filter((item) => {
            return item.status === "未有offer";
        });
        const jobs_notSuccess_ids = jobs_notSuccess.map((item) => {
            return item.sid;
        });
        // 已签三方未登记
        const jobs_notSign = ret.filter((item) => {
            return item.status === "已签三方，未登记";
        });
        const jobs_notSign_ids = jobs_notSign.map((item) => {
            return item.sid;
        });
        // 未统计
        const totalStudents = await counselorMethods.getTotalStudents(cid);
        const totalStudentsId = totalStudents.map((item) => {
            return item.uid;
        });

        const finishedStudents = [];
        for (let i = 0; i < ret.length; i++) {
            let student = await studentModel.getStudentBySid(ret[i].sid);
            finishedStudents.push(student[0]);
        }

        const finishedStudentsId = finishedStudents.map((item) => {
            return item.uid;
        });

        const notTestStudentsId = totalStudentsId.filter((item) => {
            return finishedStudentsId.indexOf(item) === -1;
        });

        const notTestStudents = [];
        for (let i = 0; i < notTestStudentsId.length; i++) {
            let student = await studentModel.getStudentBySid(notTestStudentsId[i]);
            notTestStudents.push(student[0]);
        }

        const jobs_notSuccess_students = [];
        for (let i = 0; i < jobs_notSuccess_ids.length; i++) {
            let student = await studentModel.getStudentBySid(jobs_notSuccess_ids[i]);
            jobs_notSuccess_students.push(student[0]);
        }

        const jobs_notSign_students = [];
        for (let i = 0; i < jobs_notSign_ids.length; i++) {
            let student = await studentModel.getStudentBySid(jobs_notSign_ids[i]);
            jobs_notSign_students.push(student[0]);
        }

        return {
            exams,
            exams_success,
            civils,
            jobs,
            jobs_success,
            jobs_notSuccess_students,
            jobs_notSign_students,
            totalStudents,
            finishedStudents,
            notTestStudents,
        };
    },
};
