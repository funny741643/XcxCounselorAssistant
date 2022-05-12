const _ = require("./query");
const $sqlQueryWork = require("./sqlCRUD").work;

const workModel = {
    publish: function (data) {
        return _.query($sqlQueryWork.add, data);
    },

    update: function (data) {
        const {id, title, content} = data;
        const updateData = {
            title,
            content
        }
        return _.query($sqlQueryWork.update, [updateData, id]);
    },

    getList: function (data) {
        const { cid, year } = data;
        if (year === "") {
            return _.query($sqlQueryWork.getAllList, cid);
        } else {
            return _.query($sqlQueryWork.getList, [cid, `${year}%`]);
        }
    },

    getDetail: function (id) {
        return _.query($sqlQueryWork.getDetail, id);
    }
};

module.exports = workModel;
