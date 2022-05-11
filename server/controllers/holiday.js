const moment = require("moment");
const holidayModel = require("../dao/holiday");
const classModel = require("../dao/classes");
const studentMethods = require("./students");

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

    // 通过学生id,获取该学生最近三条的请假记录
    applyListBySid: async function (sid) {
        let isSick = false;
        const ret = await holidayModel.applyListBySid(sid);
        // console.log(ret)
         // 如果最新的记录还未销假，则证明该生还为在假状态
        if (ret[0].status !== "已销假") {
            isSick = true;
        }
        if (ret[0].status === "已驳回") {
            isSick = false;
        }
        return {
            list: ret,
            isSick,
        };
    },

    getOneApply: async function (req, res, next) {
        const { id } = req.query;
        let ret = null;
        if (id) {
            ret = await holidayModel.getOneApplyById(id);
        }
        return ret[0];
    },

    // 获取待审批学生
    getWaitAgreeStudents: async function (uid) {
        const waitlist = await holidayModel.getWaitAgreeStudents(uid);
        for (let i = 0; i < waitlist.length; i++) {
            const { uid } = waitlist[i];
            const student = await studentMethods.getStudentBySid(uid);
            waitlist[i].student = student;
        }
        return waitlist;
    },
    // 获取请假学生
    getLeaveStudents: async function (uid) {
        let leaveList = await holidayModel.getLeaveStudents(uid);
        for (let i = 0; i < leaveList.length; i++) {
            const { uid } = leaveList[i];
            const student = await studentMethods.getStudentBySid(uid);
            leaveList[i].student = student;
        }
        return leaveList;
    },
    // 获取逾期未销学生
    getOverdueStudents: async function (uid) {
        let overdueList = await holidayModel.getOverdueStudents(uid);
        for (let i = 0; i < overdueList.length; i++) {
            const { uid } = overdueList[i];
            const student = await studentMethods.getStudentBySid(uid);
            overdueList[i].student = student;
        }
        return overdueList;
    },
    // 获取离校学生
    getOutschoolStudents: async function (uid) {
        return await holidayModel.getOutschoolStudents(uid);
    },

    // 获取请假管理主页基础数据
    getBaseData: async function (uid) {
        const students = await studentMethods.getStudentNumByUid(uid);
        let studentNum = 0;
        students.forEach((item) => {
            studentNum += item.students.length;
        });
        const leaveStudents = await this.getLeaveStudents(uid);
        const waitAgreeStudents = await this.getWaitAgreeStudents(uid);
        const overdueStudents = await this.getOverdueStudents(uid);
        const outschoolStudents = await this.getOutschoolStudents(uid);
        const leaveStudentsNum = leaveStudents.length;
        const waitAgreeStudentsNum = waitAgreeStudents.length;
        const overdueStudentsNum = overdueStudents.length;
        const outschoolStudentsNum = outschoolStudents.length;
        return {
            studentNum,
            leaveStudentsNum,
            waitAgreeStudentsNum,
            overdueStudentsNum,
            outschoolStudentsNum,
        };
    },

    // 删除一条请假申请
    deleteApply: async function (id) {
        return await holidayModel.deleteApply(id);
    },

    // 销假
    revocationApply: async function (id) {
        return await holidayModel.revocationApply(id);
    },

    // 审批
    sickApproval: async function (id, isAgree, suggest) {
        let status;
        if (isAgree) {
            status = 2;
        } else {
            status = 5;
        }
        return await holidayModel.sickApproval(id, status, suggest);
    },
};

module.exports = holidayMethods;
