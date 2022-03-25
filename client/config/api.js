// 服务器域名
const baseUrl = 'http://127.0.0.1:3003/';

// 登录接口
const loginUrl 	= baseUrl + 'login';

// 学生验证接口
const studentVerify = baseUrl + 'api/student/verify';

// 辅导员验证接口
const counselorVerify = baseUrl + 'api/counselor/verify';

// 获取所管班级的所有学生
const allStudentsOfClass = baseUrl + 'api/classes/allStudents';

// 获取所管宿舍
const allDormitoriesInfo = baseUrl + 'api/dormitory/allDormitories';

module.exports = {
    loginUrl,
    studentVerify,
    counselorVerify,
    allStudentsOfClass,
    allDormitoriesInfo
}