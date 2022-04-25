const express = require("express");
const router = express.Router();

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

module.exports = router;
