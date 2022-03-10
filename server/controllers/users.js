const Users = require("../dao/users");

module.exports = {
    /**
     * 保存用户信息
     */
    saveUserInfo: function(obj) {
        console.log(obj)
        const userInfo = obj.userInfo || {},
            session_key = obj.session_key || '',
            skey = obj.skey || '';
        
        // 用户信息存表
        return Users.saveUserInfo(userInfo, session_key, skey).then(function(resData) {
            return resData
        })
    },
}