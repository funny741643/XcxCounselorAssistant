const ClasseModel = require("../dao/classes");
const Students = require("../dao/students");

module.exports = {
    /**
     * 通过辅导员id获取其所管理的所有的班级信息
     */
    getclassesAndStudentsByUid: async function (uid) {

        let classInfo = await ClasseModel.getclassesByUid(uid);

        classInfo.sort((a, b) => a.class - b.class);

        let resData = [];
        for (let i = 0; i < classInfo.length; i++) {
            let students = await Students.queryStudentByClassNumber(
                classInfo[i].class_number
            );
            resData.push({ ...classInfo[i], students });
        }

        return resData;
    },

    /**
     * 获取该校的所有学院
     */
    getAllColleges: async function (req, res, next) {
        let colleges = await ClasseModel.getAllColleges();
        colleges = colleges.map(item => item.college);
        return colleges;
    },

    /**
     * 通过学院获取其所含的所有专业
     */
    getMajorsByCollege: async function(college) {
        let majors = await ClasseModel.getMajorsByCollege(college);
        majors = majors.map(item => item.major);
        return majors;
    },

    /**
     * 通过专业和班级获取到班级号
     */
    getClassNumByMajorAndClass: async function(major, ownClass) {
        let class_number = await ClasseModel.getClassNumByMajorAndClass(major, ownClass);
        class_number = class_number[0].class_number;
        return class_number;
    }
};
