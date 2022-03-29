const express = require("express");
const router = express.Router();
const checkMethods = require("../controllers/check");

router.post("/record", function (req, res, next) {
    checkMethods.postOneRecord(req, res, next);
});

router.get("/records", async function (req, res, next) {
    const { dId } = req.query;
    let records = await checkMethods.getRecordsByDid(dId);
    res.json({
        result: 0,
        data: records,
    });
});

router.get("/statistics", function (req, res, next) {
    checkMethods.getStatisticsByUid(req, res, next);
    res.json({
        data: "ok",
    });
});

module.exports = router;
