const express = require("express");
const router = express.Router();
const Class = require('../controllers/classes');

router.get("/allStudents", function (req, res, next) {
    Class.getclassesAndStudentsByUid(req, res, next);
});

module.exports = router;