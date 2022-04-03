const _ = require("./query");
const $sqlQueryDormitoryCheck = require("./sqlCRUD").check;

const check = {
    addOneRecord: function (data) {
        return _.query($sqlQueryDormitoryCheck.add, data)
    },
    getRecordsByDid: function(dId) {
        return _.query($sqlQueryDormitoryCheck.queryByDid, dId)
    },
    getRecordCounts: function(dIds) {
        return _.query($sqlQueryDormitoryCheck.queryCountsByDIds, [dIds]);
    }
};

module.exports = check;
