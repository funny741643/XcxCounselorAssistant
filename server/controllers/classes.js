const Classes = require("../dao/classes");
const Students = require('../dao/students');

module.exports = {
    /**
     * 通过辅导员id获取其所管理的所有的班级信息
     */
     getclassesAndStudentsByUid: async function(req, res, next) {
        const { uid } = req.query;
        
        let classInfo = await Classes.getclassesByUid(uid)

        classInfo.sort((a, b) => a.class - b.class)

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