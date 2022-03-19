// 服务器域名
const baseUrl = 'http://127.0.0.1:3003/';

// 登录接口
const loginUrl 	= baseUrl + 'login';

// 学生验证接口
const studentVerify = baseUrl + 'api/student/verify';

module.exports = {
    loginUrl,
    studentVerify
}