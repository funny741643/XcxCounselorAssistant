const express = require("express");
const router = express.Router();
const DormitoryMethods = require("../controllers/dormitories");

router.get("/allDormitories", async function (req, res, next) {
    const { uid } = req.query;
    let resData = await DormitoryMethods.getDormitoryInfoByUid(uid);

    res.json({
        result: "0",
        data: resData,
    });
});

router.get("/allDormitoryIds", function (req, res, next) {
    const { uid } = req.query;
    let allDormitoryIds = DormitoryMethods.getDormitoryIdByUid(uid);

    res.json({
        result: 0,
        data: allDormitoryIds,
    });
});

router.get("/baseDataById", async function (req, res, next) {
    const { uid } = req.query;
    let resData = await DormitoryMethods.getBaseData(uid);
    res.json({
        result: 0,
        data: resData,
    })
});

router.get("/apartments", async function(req, res, next) {
    let resData = await DormitoryMethods.getApartments()
    res.json({
        result: 0,
        data: resData
    })
})

// 待思考
// router.get("/dormitoryNumByApartment", async function(req, res, next) {})
module.exports = router;
