const _ = require("./query");
const $sqlQueryClass = require("./sqlCRUD").classes;


const classes = {
    getclassesAndStudentsByUid: function (uid) {
        return _.query($sqlQueryClass.queryByUid, uid)
    },
};

module.exports = classes;
