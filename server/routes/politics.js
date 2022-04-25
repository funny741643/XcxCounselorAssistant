const express = require("express");
const router = express.Router();
const ClassMethods = require("../controllers/classes");
const politicsMap = {
    "1": "群众",
    "2": "团员",
    "3": "积极分子",
    "4": "预备党员",
    "5": "党员",
}

router.get('/statusData', async function(req, res, next) {
    const { uid, status } = req.query;
    let ret = await ClassMethods.getclassesAndStudentsByUid(uid);
    const data = []
    ret.forEach(item => {
        let students = item.students.filter(student => {
            return student.politics_status === politicsMap[status];
        })
        data.push({...item, students})
    })
    res.json({
        result: 0,
        data: data,
    });
})

module.exports = router;
