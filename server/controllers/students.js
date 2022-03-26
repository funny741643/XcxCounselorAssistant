const Students = require("../dao/students");

module.exports = {
    insertStudentInfo(req, res, next) {
        const {studentInfo, uid, role} = req.query;

        Students.insertStudentInfo(uid, studentInfo, role).then(function(resData) {
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

    async getStudentsByDormitoryIdInClassNumber(req, res, next) {
        const { dormitoryId, class_numbers } = req.query;
        let resData = await Students.getStudentsByDormitoryIdInClassNumber( dormitoryId, class_numbers);
        return resData;
    }
}