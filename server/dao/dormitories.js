const _ = require("./query");
const $sqlQueryDormitory = require("./sqlCRUD").dormitory;


const dormitory = {
    getDormitoryByUid: function (id) {
        return _.query($sqlQueryDormitory.queryById, id)
    },

    getDormitoryCount: function(ids) {
        return _.query($sqlQueryDormitory.queryApartmentCount, [ids]);
    }
};

module.exports = dormitory;
