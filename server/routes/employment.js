const express = require("express");
const router = express.Router();
const employmentMethods = require("../controllers/employment");

router.post("/publish", async function (req, res, next) {
    const data = req.body;
    const result = await employmentMethods.publish(data);
    res.json({
        result: 0,
        data: result,
    });
});

router.get("/getList", async function (req, res, next) {
    const data = req.query;
    let ret = await employmentMethods.getList(data);
    res.json({
        result: 0,
        data: ret,
    });
});

router.get("/detail", async function (req, res, next) {
    const data = req.query;
    const { cid, nid } = data;
    let ret = await employmentMethods.getDetail(cid, nid);
    res.json({
        result: 0,
        data: ret,
    });
});

router.post("/addRecord", async function (req, res, next) {
    const data = req.body;
    console.log(data);
    let ret = await employmentMethods.addRecord(data);
    res.json({
        result: 0,
        data: ret,
    });
});

module.exports = router;
