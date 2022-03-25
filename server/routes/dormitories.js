const express = require("express");
const router = express.Router();
const Dormitory = require('../controllers/dormitories');

router.get("/allDormitories", function (req, res, next) {
    Dormitory.getDormitoryInfoByUid(req, res, next);
});

module.exports = router;