const _ = require("./query");
const $sqlQueryDormitory = require("./sqlCRUD").dormitory;


const dormitory = {
    getDormitoryByUid: function (id) {
        return _.query($sqlQueryDormitory.queryById, id)
    },

    getDormitoryCount: function(ids) {
        return _.query($sqlQueryDormitory.queryApartmentCount, [ids]);
    },

    getApartments: function() {
        return _.query($sqlQueryDormitory.queryApartments);
    },

    getIdByApartmentAndNum: function(apartment, dormitory_num) {
        return _.query($sqlQueryDormitory.queryIdByApartmentAndNum, [apartment, dormitory_num]);
    },

    getDormitoryInfoById: function(id) {
        return _.query($sqlQueryDormitory.queryDormitoryInfoById, id);
    }
};

module.exports = dormitory;
