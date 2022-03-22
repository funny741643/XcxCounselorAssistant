const Classes = require("../dao/classes");
const Students = require('../dao/students');

module.exports = {
    /**
     * 通过专业和年级获取所有的班级信息
     */
     getclassesAndStudentsByUid: async function(req, res, next) {
        const { uid } = req.query;
        
        let classInfo = await Classes.getclassesAndStudentsByUid(uid)

        classInfo.sort((a, b) => a.class - b.class )

        let resData = []
        for (let i = 0; i< classInfo.length; i++) {
            let students = await Students.queryStudentByClassNumber(classInfo[i].class_number)
            resData.push({...classInfo[i], students})
        }
        
        res.json({
            result: '0',
            data: resData
        })
        
    },
}