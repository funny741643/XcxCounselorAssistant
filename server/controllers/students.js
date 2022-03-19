const Students = require("../dao/students");

module.exports = {
    insertStudentInfo(req, res, next) {
        // console.log(req.query)
        const {studentInfo, uid, role} = req.query;

        Students.insertStudentInfo(uid, studentInfo, role).then(function(resData) {
            console.log(resData)
            res.json({
                result: 0,
                data: resData
            })    
        })
    }
}