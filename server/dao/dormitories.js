const _ = require("./query");
const $sqlQueryDormitory = require("./sqlCRUD").dormitory;


const dormitory = {
    getclassesByUid: function (id) {
        return _.query($sqlQueryDormitory.queryById, id)
    },
};

module.exports = dormitory;
