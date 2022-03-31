const express = require("express");
const router = express.Router();
const Dormitory = require("../controllers/dormitories");

router.get("/allDormitories", async function (req, res, next) {
    const { uid } = req.query;
    let resData = await Dormitory.getDormitoryInfoByUid(uid);

    res.json({
        result: "0",
        data: resData,
    });
});

router.get("/allDormitoryIds", function (req, res, next) {
    const { uid } = req.query;
    let allDormitoryIds = Dormitory.getDormitoryIdByUid(uid);

    res.json({
        result: 0,
        data: allDormitoryIds,
    });
});

module.exports = router;
