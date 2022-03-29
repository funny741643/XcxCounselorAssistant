const express = require("express");
const router = express.Router();
const Dormitory = require('../controllers/dormitories');

router.get("/allDormitories", function (req, res, next) {
    Dormitory.getDormitoryInfoByUid(req, res, next);
});

router.get("/allDormitoryIds", function (req, res, next) {
    let allDormitoryIds = Dormitory.getDormitoryIdByUid(req, res, next);
    res.json({
        result: 0,
        data: allDormitoryIds,
    })
});

module.exports = router;