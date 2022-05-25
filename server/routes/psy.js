const express = require("express");
const router = express.Router();
const psyMethods = require("../controllers/psy");

router.get('/question', function(req, res, next) {
    const data = req.query;
    let ret = psyMethods.getQuestion(data);
    res.json({
        result: 0,
        data: ret,
    });
})

router.post('/publish', async function(req, res, next) {
    const data = req.body;
    let ret = await psyMethods.publish(data);
    res.json({
        result: 0,
        data: ret,
    });
})

router.get('/getList', async function(req, res, next) {
    const data = req.query;
    let ret = await psyMethods.getList(data);
    res.json({
        result: 0,
        data: ret,
    });
})

router.post('/addResult', async function(req, res, next) {
    const data = req.body;
    let ret = await psyMethods.addResult(data);
    res.json({
        result: 0,
        data: ret,
    });
})

router.get('/detail', async function(req, res, next) {
    const data = req.query;
    let ret = await psyMethods.getDetail(data);
    res.json({
        result: 0,
        data: ret,
    });
})

router.post('/delete', async function(req, res, next) {
    const data = req.body;
    let errmsg = "";
    let msg = "";
    try {
        const resData = await psyMethods.delete(data);
        if (resData) {
            msg = "删除成功";
        } else {
            errmsg = "删除失败";
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
