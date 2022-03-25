const _ = require("./query");
const $sqlQueryClass = require("./sqlCRUD").classes;


const classes = {
    getclassesByUid: function (uid) {
        return _.query($sqlQueryClass.queryByUid, uid)
    },
};

module.exports = classes;
