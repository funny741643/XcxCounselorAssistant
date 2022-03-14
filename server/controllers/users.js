const Users = require("../dao/users");

module.exports = {
    /**
     * 保存用户信息
     */
    saveUserInfo: function(obj) {
        const userInfo = JSON.parse(obj.userInfo) || {},
            session_key = obj.session_key || '',
            skey = obj.skey || '';
            openid = obj.openid || '';

        // 用户信息存表
        return Users.saveUserInfo(userInfo, session_key, skey, openid).then(function(resData) {
            return resData
        })
    },
}