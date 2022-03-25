const Classes = require("../dao/classes");
const Students = require("../dao/students");
const Dormitories = require("../dao/dormitories");

module.exports = {
    getDormitoryInfoByUid: async function (req, res, next) {
        const { uid } = req.query;
        console.log(uid);

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

        allDormitoryIds = Array.from(new Set(allDormitoryIds));
        
        const resData = [];
        for (let i = 0; i< allDormitoryIds.length; i++) {
            let ret = await Dormitories.getclassesByUid(allDormitoryIds[i])
            resData.push(ret[0])
        }

        res.json({
            result: "0",
            data: resData,
        });
    },
};
