const express = require("express");
const router = express.Router();
const Counselor = require('../controllers/counselors');

router.get("/verify", function (req, res, next) {
    Counselor.insertCounselorInfo(req, res, next);
});

router.get('/info', async function(req, res, next) {
    const {id} = req.query;
    let ret = await Counselor.getCounselorInfo(id);
    res.json({
        result: 0,
        data: ret
    })
});

module.exports = router;