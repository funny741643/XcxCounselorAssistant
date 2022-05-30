const express = require("express");
const router = express.Router();
const workMethods = require("../controllers/work");

router.post("/publish", async function (req, res, next) {
    const data = req.body;
    let ret = await workMethods.publish(data);
    const id = ret.insertId;
    res.json({
        result: 0,
        data: id,
    });
});

router.get("/getList", async function (req, res, next) {
    const data = req.query;
    let ret = await workMethods.getList(data);
    res.json({
        result: 0,
        data: ret,
    });
});

router.get("/detail", async function (req, res, next) {
    const data = req.query;
    const { id } = data;
    let ret = await workMethods.getDetail(id);
    console.log(id, ret);
    res.json({
        result: 0,
        data: ret,
    });
});

module.exports = router;
