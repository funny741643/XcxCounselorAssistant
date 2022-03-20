const moment = require('moment');
const _ = require('./query');
const $sqlQueryUser = require('./sqlCRUD').user;
const $sqlQueryStu = require('./sqlCRUD').student;
const $sqlQueryCounselor = require('./sqlCRUD').counselor;

const user = {
    saveUserInfo: function(userInfo, session_key, skey, openid) {
        const uid = openid,
            create_time = moment().format('YYYY-MM-DD HH:mm:ss'),
            update_time = create_time;
        const insertObj = {
            'uid': uid,
            'uname': userInfo.nickName,
            'uavatar': userInfo.avatarUrl,
            'ugender': userInfo.gender,
            'skey': skey,
            'sessionkey': session_key,
            'update_time': update_time,
            'create_time': create_time,
            'role': 0,
        }
        const updateObj = {
            'uname': userInfo.nickName,
            'uavatar': userInfo.avatarUrl,
            'ugender': userInfo.gender,
            'skey': skey,
            'sessionkey': session_key,
            'update_time': update_time
        }
        
        let role = 0;
        return _.query($sqlQueryUser.queryById, uid)
            .then(function(res) {
                if (res && res[0]) {
                    role = res[0].urole;
                    return _.query($sqlQueryUser.update, [updateObj, uid])
                } else {
                    console.log('插入成功')
                    return _.query($sqlQueryUser.add, insertObj)
                }
            })
            .then(function() { 
                if (role === 1) {
                    return _.query($sqlQueryCounselor.queryById, uid)
                } else if (role === 2) {
                    return _.query($sqlQueryStu.queryById, uid)
                } else {
                    return new Promise((resolve, reject) => {
                        resolve([{}])
                    })
                }
            })
            .then((res) => {
                const resUserObj = Object.assign({}, userInfo)
                let detailInfo = res[0];
                return {
                    uid,
                    skey,
                    role,
                    detailInfo,
                    userInfo: resUserObj,
                }
            })
            .catch(function(e) {
                console.log('save userInfo error', JSON.stringify(e));
                return {
                    errmsg: JSON.stringify(e)
                }
            })
    }
}

module.exports = user