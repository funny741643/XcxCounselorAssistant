const moment = require("moment");
const workModel = require("../dao/work");

module.exports = {
    publish: async function (data) {
        let { id, cid, title, content } = data;
        let ret;
        let date = moment().format("YYYY-MM-DD");
        if (id) {
            ret = await workModel.update({
                id,
                cid,
                date,
                title,
                content,
            });
        } else {
            
            const query = {
                cid,
                title,
                content,
                date,
            };
            ret = await workModel.publish(query);
        }
        return ret;
    },

    getList: async function (data) {
        let { cid, year, month } = data;
        const query = {
            cid,
            year,
        };
        let ret = await workModel.getList(query);
        if (month) {
            ret = ret.map((item) => {
                let itemMonth = (item.date.getMonth() + 1) % 12;
                if (itemMonth === +month) {
                    return item;
                }
            });
        }
        return ret;
    },

    getDetail: async function (id) {
        let ret = await workModel.getDetail(id);
        return ret[0];
    },
};
