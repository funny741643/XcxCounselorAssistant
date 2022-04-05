const _ = require("./query");
const $sqlQueryClass = require("./sqlCRUD").classes;


const classes = {
    getclassesByUid: function (uid) {
        return _.query($sqlQueryClass.queryByUid, uid)
    },

    getAllColleges: function() {
        return _.query($sqlQueryClass.queryCollege)
    },

    getMajorsByCollege: function(college) {
        return _.query($sqlQueryClass.queryMajorByCollege, college)
    }
};

module.exports = classes;
