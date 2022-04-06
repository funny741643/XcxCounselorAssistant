const StudentModel = require("../dao/students");
const ClassMethods = require("./classes");
const DormitoryMethods = require("./dormitories");

module.exports = {
    async insertStudentInfo(req, res, next) {
        const { studentInfo, uid, role } = req.query;
        console.log(studentInfo, uid, role);
        const {
            major,
            class: ownClass,
            apartment,
            dormitory: dormitory_num,
            name,
            telephone,
            number,
            pictrue,
        } = JSON.parse(studentInfo);

        let class_number = await ClassMethods.getClassNumByMajorAndClass(major, ownClass);
        let dormitory_id = await DormitoryMethods.getIdByApartmentAndNum(apartment, dormitory_num);
        const student = {
            uid,
            class_number,
            dormitory_id,
            pictrue: pictrue || '',
            name,
            telephone,
            number,
        };

        let resData = await StudentModel.insertStudentInfo(student, role);
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
    },

    async getStudentsByDormitoryIdInClassNumber(req, res, next) {
        const { dormitoryId, class_numbers } = req.query;
        let resData = await StudentModel.getStudentsByDormitoryIdInClassNumber(
            dormitoryId,
            class_numbers
        );
        return resData;
    },
};
