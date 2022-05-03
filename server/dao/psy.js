const _ = require("./query");
const $sqlQueryPsy = require("./sqlCRUD").psy;

const psyModel = {
    publish: function (data) {
        return _.query($sqlQueryPsy.add, data); 
    },
    getList: function(cid) {
        return _.query($sqlQueryPsy.getList, cid);
    },
    addResult: function(data) {
        return _.query($sqlQueryPsy.addResult, data);
    },
    getDetail: function(id) {
        return _.query($sqlQueryPsy.getDetail, id);
    }
};

module.exports = psyModel;
