const express = require("express");
const router = express.Router();
const holidayMethods = require("../controllers/holiday");

router.post("/apply", async function (req, res, next) {
    const data = req.body;
    let errmsg = "";
    let msg = "";
    try {
        const resData = await holidayMethods.holidayApply(data);
        if (resData) {
            msg = "申请成功";
        } else {
            errmsg = "申请失败";
        }
    } catch (e) {
        errmsg = JSON.stringify(e);
    }

    res.json({
        msg,
        errmsg,
        result: 0,
    });
});

router.get("/applyListBySid", async function (req, res, next) {
    const { uid: sid } = req.query;
    let ret = await holidayMethods.applyListBySid(sid);
    res.json({
        result: 0,
        data: ret,
    });
});

router.get("/getOneApply", async function (req, res, next) {
    let ret = await holidayMethods.getOneApply(req, res, next);
    res.json({
        result: 0,
        data: ret,
    });
});

module.exports = router;
