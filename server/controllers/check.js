const checkModel = require("../dao/check");
const moment = require("moment");
const dormitoryMethods = require('./dormitories');

const checkMethods = {
    postOneRecord: async function (req, res, next) {
        let check_date = moment().format("YYYY-MM-DD");
        const data = { check_date, ...req.body };
        console.log(data)
        try {
            const ret = await checkModel.addOneRecord(data);
            if (ret) {
                res.json({
                    result: 0,
                    message: "增添成功",
                });
            }
        } catch (e) {
            res.json({
                result: -3,
                err: e.sqlMessage,
            });
        }
    },

    getRecordsByDid: async function (dId) {
        try {
            const ret = await checkModel.getRecordsByDid(dId);
            return ret;
        } catch(e) {
            res.json({
                result: -3,
                err: e.sqlMessage,
            });
        }
    },

    getStatisticsByUid: async function(req, res, next) {
        let allRecords = []
        let dormitoryIds = await dormitoryMethods.getDormitoryIdByUid(req, res, next)
        for (let i = 0; i < dormitoryIds.length; i++) {
            const ret = await this.getRecordsByDid(dormitoryIds[i])
            allRecords.push(ret)
        }
        console.log(allRecords)
    }
};

module.exports = checkMethods;
