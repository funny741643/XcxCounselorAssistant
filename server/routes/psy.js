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

module.exports = router;
