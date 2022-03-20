const _ = require('./query');
const $sqlQueryCounselor = require('./sqlCRUD').counselor;
const $sqlQueryUser = require('./sqlCRUD').user;

const counselor = {
    insertCounselorInfo(uid, counselorInfo, role) {
       counselorInfo = JSON.parse(counselorInfo)
        const insertObj = {
            'uid': uid,
            'class_number': 'KNSKPI',
            ...counselorInfo
        }
        console.log(insertObj)
        _.query($sqlQueryUser.update, [{urole: role}, uid]).then((res) => {
            console.log('辅导员角色更新成功');
        })
        return _.query($sqlQueryCounselor.queryById, uid)
            .then(function(res) {
                if (res && res[0]) {
                    return new Promise((resolve, reject) => {
                        reject('您已经认证过了！！')
                    })
                } else {
                    return _.query($sqlQueryCounselor.add, insertObj);
                }
            }).then(function(res) {
                console.log(res);
                const resCounselorObj = Object.assign({}, counselorInfo)
                return {
                    counselorInfo: resCounselorObj,
                    role
                }
            }).catch(function(e) {
                return {
                    errmsg: JSON.stringify(e)
                }
            })
    }
}

module.exports = counselor;