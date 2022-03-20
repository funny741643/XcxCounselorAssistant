const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
    if (res["auth_data"] && res["auth_data"]["uid"]) {
        res.json({
            result: 0,
            data: res["auth_data"]
        });
    } else {
        res.json({
            result: -3,
            errmsg: "返回数据出错",
        });
    }
});

module.exports = router;
