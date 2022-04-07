const _ = require("./query");
const $sqlQueryHoliday = require("./sqlCRUD").holiday;

const holidayModel = {
    holidayApply: function (data) {
        return _.query($sqlQueryHoliday.add, data);
    },
};

module.exports = holidayModel;
