const Counselors = require("../dao/counselors");

module.exports = {
    insertCounselorInfo(req, res, next) {
        const {counselorInfo, uid, role} = req.query;

        Counselors.insertCounselorInfo(uid, counselorInfo, role).then(function(resData) {
            if (resData.errmsg) {
                res.json({
                    result: -3,
                    errmsg: resData.errmsg
                })
            } else {
                res.json({
                    result: 0,
                    data: resData
                })   
            }
        })
    }
}