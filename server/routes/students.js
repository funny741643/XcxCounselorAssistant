const express = require("express");
const router = express.Router();
const Student = require('../controllers/students');

router.get("/verify", function (req, res, next) {
    Student.insertStudentInfo(req, res, next);
});

module.exports = router;