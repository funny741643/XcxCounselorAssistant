const checkModel = require("../dao/check");
const moment = require("moment");
const dormitoryMethods = require("./dormitories");
const dormitoryModel = require("../dao/dormitories");

const checkMethods = {
    /**
     * 根据宿舍id，为其新增一条检查记录
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    postOneRecord: async function (req, res, next) {
        let check_date = moment().format("YYYY-MM-DD");
        const data = { check_date, ...req.body };
        console.log(data);
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

    /**
     * 根据宿舍id获取其所有检查记录
     * @param {宿舍id} dId
     * @returns
     */
    getRecordsByDid: async function (dId) {
        try {
            const ret = await checkModel.getRecordsByDid(dId);
            return ret;
        } catch (e) {
            res.json({
                result: -3,
                err: e.sqlMessage,
            });
        }
    },

    /**
     * 通过用户id获取宿舍检查的统计结果
     * @param {用户id} uid
     */
    getStatisticsByUid: async function (uid) {
        let allRecords = {};
        let resData = [];
        let dormitoryIds = await dormitoryMethods.getDormitoryIdByUid(uid);
        for (let i = 0; i < dormitoryIds.length; i++) {
            let record = await this.getRecordsByDid(dormitoryIds[i]);
            allRecords[dormitoryIds[i]] = record;
        }

        let recordKeys = Object.keys(allRecords);
        for (let i = 0; i < recordKeys.length; i++) {
            let key = recordKeys[i];
            let count = allRecords[key].length;
            const dormitoryInfo = await dormitoryModel.getDormitoryByUid(key);
            const dormitoryName = `${dormitoryInfo[0].apartment.slice(0, 2)}${
                dormitoryInfo[0].dormitory_number
            }`;
            let result = {
                不达标: 0,
                达标: 0,
                优秀: 0,
            };
            allRecords[key].forEach((item) => {
                result[item.level] = result[item.level] + 1;
            });
            let record = {
                count,
                result,
                dormitoryName,
            };
            resData.push(record);
        }
        return resData;
    },
};

module.exports = checkMethods;
