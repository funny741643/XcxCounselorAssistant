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

// 提交一条宿舍检查记录
const postDormitoryCheckRecord = baseUrl + 'api/check/record';
// 根据宿舍id获取该宿舍的所有检查记录
const getCheckRecordsByDid = baseUrl+'api/check/records';
// 获取所管理所有宿舍的检查报告
const getCheckstatisticsByUid = baseUrl+'api/check/statistics';

module.exports = {
    loginUrl,
    studentVerify,
    counselorVerify,
    allStudentsOfClass,
    allDormitoriesInfo,
    postDormitoryCheckRecord,
    getCheckRecordsByDid,
    getCheckstatisticsByUid
}