const _ = require("./query");
const $sqlQueryHoliday = require("./sqlCRUD").holiday;

const holidayModel = {
    holidayApply: function (data) {
        return _.query($sqlQueryHoliday.add, data);
    },

    applyListBySid: function(sid) {
        return _.query($sqlQueryHoliday.queryApplysBySid, sid);
    },

    getOneApplyById: function(id) {
        return _.query($sqlQueryHoliday.queryApplyById, id);
    }
};

module.exports = holidayModel;
