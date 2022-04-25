const express = require("express");
const router = express.Router();
const studentMethods = require("../controllers/students");

router.get("/verify", function (req, res, next) {
    studentMethods.insertStudentInfo(req, res, next);
});

router.get("/getInfoById", async function (req, res, next) {
    const { id } = req.query;
    let ret = await studentMethods.getStudentBySid(id);
    console.log(ret);
    res.json({
        result: 0,
        data: ret,
    });
});

module.exports = router;
