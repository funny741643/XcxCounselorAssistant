const express = require("express");
const router = express.Router();
const ClassMethods = require("../controllers/classes");

router.get("/allStudents", function (req, res, next) {
    ClassMethods.getclassesAndStudentsByUid(req, res, next);
});

router.get("/allColleges", async function (req, res, next) {
    let colleges = await ClassMethods.getAllColleges(req, res, next);
    console.log(colleges);
    res.json({
        result: 0,
        data: colleges,
    });
});

router.get("/majorsByCollege", async function (req, res, next) {
    const { college } = req.query;
    let majors = await ClassMethods.getMajorsByCollege(college);
    res.json({
        result: 0,
        data: majors
    })
});

module.exports = router;
