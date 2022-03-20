const express = require("express");
const router = express.Router();
const Counselor = require('../controllers/counselors');

router.get("/verify", function (req, res, next) {
    Counselor.insertCounselorInfo(req, res, next);
});

module.exports = router;