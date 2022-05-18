const Counselors = require("../dao/counselors");
const studentMethods = require("./students");

module.exports = {
    insertCounselorInfo(req, res, next) {
        const {counselorInfo, uid, role} = req.query;

        Counselors.insertCounselorInfo(uid, counselorInfo, role).then(function(resData) {
            if (resData.errmsg) {
                res.json({
                    result: -3,
                    errmsg: resData.errmsg
                })
            } else {
                res.json({
                    result: 0,
                    data: resData
                })   
            }
        })
    },

    // 获取所管理的所有学生的信息
    async getTotalStudents(cid) {
        let totalStudents = [];
        const classes = await studentMethods.getStudentNumByUid(cid);
        classes.forEach((item) => {
            totalStudents = [...totalStudents, ...item.students];
        });
        return totalStudents;
    },

    async getCounselorInfo(id) {
        let ret = await Counselors.getCounselorInfo(id);
        return ret[0];
    }
}