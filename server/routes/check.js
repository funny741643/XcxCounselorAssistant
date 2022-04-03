const express = require("express");
const router = express.Router();
const checkMethods = require("../controllers/check");

/**
 * 为一个宿舍新增一条检查记录
 */
router.post("/record", function (req, res, next) {
    checkMethods.postOneRecord(req, res, next);
});

/**
 * 获取一个宿舍的所有检查记录
 */
router.get("/records", async function (req, res, next) {
    const { dId } = req.query;
    let records = await checkMethods.getRecordsByDid(dId);
    res.json({
        result: 0,
        data: records,
    });
});

/**
 * 获取宿舍检查的统计结果
 */
router.get("/statistics", async function (req, res, next) {
    const { uid } = req.query;
    let resData = await checkMethods.getStatisticsByUid(uid);
    console.log(resData)
    res.json({
        result: 0,
        data: resData,
    });
});

module.exports = router;
