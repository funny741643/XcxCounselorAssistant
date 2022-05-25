const _ = require("./query");
const $sqlQueryEmployment = require("./sqlCRUD").employment;

const employmentModel = {
    publish: function (data) {
        return _.query($sqlQueryEmployment.add, data); 
    },
    getList: function(cid) {
        return _.query($sqlQueryEmployment.getList, cid);
    },
    addRecord: function(data) {
        return _.query($sqlQueryEmployment.addRecord, data);
    },
    getDetail: function(id) {
        return _.query($sqlQueryEmployment.getDetail, id);
    },
    delete: function(id) {
        return _.query($sqlQueryEmployment.delete, id);
    }
};

module.exports = employmentModel;
