const Classes = require("../dao/classes");
const Students = require("../dao/students");
const Dormitories = require("../dao/dormitories");

module.exports = {
    getDormitoryIdByUid: async function (uid) {
        let classInfo = await Classes.getclassesByUid(uid);
        let class_numbers = classInfo
            .sort((a, b) => a.class - b.class)
            .map((item) => item.class_number);

        let allDormitoryIds = [];
        for (let i = 0; i < class_numbers.length; i++) {
            let ret = await Students.getDormitoryByClassNumber(
                class_numbers[i]
            );
            let dormitoryId = ret[0].dormitory_id;
            allDormitoryIds.push(dormitoryId);
        }

        return allDormitoryIds.sort();
    },

    /**
     * 通过辅导员的Id号获取到其所管理宿舍的信息
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    getDormitoryInfoByUid: async function (uid) {
        let allDormitoryIds = await this.getDormitoryIdByUid(uid);
        let classInfo = await Classes.getclassesByUid(uid);
        let class_numbers = classInfo
            .sort((a, b) => a.class - b.class)
            .map((item) => item.class_number);
        const resData = [];
        for (let i = 0; i < allDormitoryIds.length; i++) {
            let dormitory = await Dormitories.getDormitoryByUid(
                allDormitoryIds[i]
            );
            let students = await Students.getStudentsByDormitoryIdInClassNumber(
                allDormitoryIds[i],
                class_numbers
            );
            resData.push({
                dormitory: { ...dormitory[0], studentCounts: students.length },
                students,
            });
        }

        return resData;
    },
};
