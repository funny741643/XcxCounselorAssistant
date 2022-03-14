const moment = require('moment');
const _ = require('./query');
const $sqlQuery = require('./sqlCRUD').user;

const user = {
    saveUserInfo: function(userInfo, session_key, skey, openid) {
        const uid = openid,
            create_time = moment().format('YYYY-MM-DD HH:mm:ss'),
            update_time = create_time;
        const insertObj = {
            'uid': uid,
            'uname': userInfo.nickName,
            'uavatar': userInfo.avatarUrl,
            'skey': skey,
            'sessionkey': session_key,
            'update_time': update_time,
            'create_time': create_time,
            'role': 0,
        }
        const updateObj = {
            'uname': userInfo.nickName,
            'uavatar': userInfo.avatarUrl,
            'skey': skey,
            'sessionkey': session_key,
            'update_time': update_time
        }
        return _.query($sqlQuery.queryById, uid)
            .then(function(res) {
                if (res && res[0]) {
                    console.log('更新成功:')
                    return _.query($sqlQuery.update, [updateObj, uid])
                } else {
                    console.log('插入成功')
                    return _.query($sqlQuery.add, insertObj)
                }
            })
            .then(function() {
                return {
                    uid,
                    skey: skey
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