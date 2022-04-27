const express = require("express");
const router = express.Router();
const notificationMethods = require("../controllers/notification");

router.post('/publish', async function(req, res, next) {
    const data = req.body;
    let errmsg = "";
    let msg = "";
    try {
        const resData = await notificationMethods.publish(data);
        if (resData) {
            msg = "发布成功";
        } else {
            errmsg = "发布失败";
        }
    } catch (e) {
        errmsg = JSON.stringify(e);
    }

    res.json({
        msg,
        errmsg,
        result: 0,
    });
})

router.get('/list', async function(req, res, next) {
    const data = req.query;
    let ret = await notificationMethods.getList(data);
    res.json({
        result: 0,
        data: ret,
    });
})

router.post('/feedback', async function(req, res, next) {
    const data = req.body;
    let errmsg = "";
    let msg = "";
    try {
        const resData = await notificationMethods.feedback(data);
        if (resData) {
            msg = "确认成功";
        } else {
            errmsg = "确认失败";
        }
    } catch (e) {
        errmsg = JSON.stringify(e);
    }

    res.json({
        msg,
        errmsg,
        result: 0,
    });
})

module.exports = router;
