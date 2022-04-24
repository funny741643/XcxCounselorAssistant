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
    getOutschoolStudents: function(uid) {
        return _.query($sqlQueryHoliday.queryOutschoolStudents, uid);
    },

    deleteApply: function(id) {
        return _.query($sqlQueryHoliday.deleteApply, id);
    },

    revocationApply: function(id) {
        return _.query($sqlQueryHoliday.revocationApply, id);
    },

    sickApproval: function(id, status, suggest) {
        return _.query($sqlQueryHoliday.sickApproval, [status, suggest, id]);
    }
};

module.exports = holidayModel;
