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
    },

    getWaitAgreeStudents: function(uid) {
        return _.query($sqlQueryHoliday.queryWaitAgreeStudents, uid);
    },
    getLeaveStudents: function(uid) {
        return _.query($sqlQueryHoliday.queryLeaveStudents, uid);
    },
    getOverdueStudents: function(uid) {
        return _.query($sqlQueryHoliday.queryOverdueStudents, uid);
    },

    deleteApply: function(id) {
        return _.query($sqlQueryHoliday.deleteApply, id);
    },

    revocationApply: function(id) {
        return _.query($sqlQueryHoliday.revocationApply, id);
    }
};

module.exports = holidayModel;
