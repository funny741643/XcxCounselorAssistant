const _ = require("./query");
const $sqlQueryDormitory = require("./sqlCRUD").dormitory;


const dormitory = {
    getDormitoryByUid: function (id) {
        return _.query($sqlQueryDormitory.queryById, id)
    },
};

module.exports = dormitory;
