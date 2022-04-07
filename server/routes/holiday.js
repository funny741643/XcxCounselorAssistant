const express = require("express");
const router = express.Router();
const holidayMethods = require('../controllers/holiday');

router.post("/apply",async function (req, res, next) {
    const data = req.body;

    const resData = await holidayMethods.holidayApply(data);

    res.json({
        result: 0,
        data: resData,
    });
});

module.exports = router;
