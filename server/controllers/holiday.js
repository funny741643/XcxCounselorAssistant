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
        // 如果最新的记录还未销假，则证明该生还为在假状态
        if(ret[0].status !== '已销假') {
            isSick = true;
        }
        return {
            list: ret,
            isSick
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

    // 获取待审批学生总数
    getWaitAgreeStudents: async function (uid) {
        return await holidayModel.getWaitAgreeStudents(uid);
    },
    // 获取请假学生总数
    getLeaveStudents: async function (uid) {
        return await holidayModel.getLeaveStudents(uid);
    },
    // 获取逾期未销学生总数
    getOverdueStudents: async function (uid) {
        return await holidayModel.getOverdueStudents(uid);
    },

    // 获取请假管理主页基础数据
    getBaseData: async function (uid) {
        const students = await studentMethods.getStudentNumByUid(uid);
        let studentNum = 0
        students.forEach(item => {
            studentNum += item.students.length;
        })
        const leaveStudents = await this.getLeaveStudents(uid);
        console.log(studentNum);
        console.log(leaveStudents);
        return 'lal'
    },

    // 删除一条请假申请
    deleteApply: async function (id) {
        return await holidayModel.deleteApply(id);
    },

    // 销假
    revocationApply: async function (id) {
        return await holidayModel.revocationApply(id);
    }
};

module.exports = holidayMethods;
