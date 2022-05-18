// 服务器域名
const baseUrl = "http://127.0.0.1:3003/";

// 登录接口
const loginUrl = baseUrl + "login";

// 获取所有学院
const getAllColleges = baseUrl + "api/classes/allColleges";

// 根据学院获取到其所含专业
const getMajorsByCollege = baseUrl + "api/classes/majorsByCollege";

// 学生验证接口
const studentVerify = baseUrl + "api/student/verify";

// 辅导员验证接口
const counselorVerify = baseUrl + "api/counselor/verify";

// 通过学生id获取到学生信息
const getStudentInfoById = baseUrl + "api/student/getInfoById";

// 通过导员id获取到导员信息
const getCounselorInfoById = baseUrl + "api/counselor/info";

// 获取所管班级的所有学生
const allStudentsOfClass = baseUrl + "api/classes/allStudents";

// 获取所管宿舍
const allDormitoriesInfo = baseUrl + "api/dormitory/allDormitories";
// 获取宿舍管理基本数据
const dormitoryBaseData = baseUrl + "api/dormitory/baseDataById";
// 获取所有公寓名称
const getApartments = baseUrl + "api/dormitory/apartments";

// 提交一条宿舍检查记录
const postDormitoryCheckRecord = baseUrl + "api/check/record";
// 根据宿舍id获取该宿舍的所有检查记录
const getCheckRecordsByDid = baseUrl + "api/check/records";
// 获取所管理所有宿舍的检查报告
const getCheckstatisticsByUid = baseUrl + "api/check/statistics";

// 请假申请
const postHolidayApply = baseUrl + "api/holiday/apply";
const getHolidayApplysBySid = baseUrl + "api/holiday/applyListBySid";
const getOneHolidayApply = baseUrl + "api/holiday/getOneApply";
const getLeaveBaseData = baseUrl + "api/holiday/getBaseData";
const getWaitList = baseUrl + "api/holiday/waitList";
const getOverdueList = baseUrl + "api/holiday/overdueList";
const getLeaveList = baseUrl + "api/holiday/leaveList";
const deleteApply = baseUrl + "api/holiday/deleteApply";
const revocationApply = baseUrl + "api/holiday/revocationApply";
const sickApproval = baseUrl + "api/holiday/sickApproval";

// 党团管理
const getPoliticsStatusData = baseUrl + "api/politics/statusData";

// 通知管理
const insertNotification = baseUrl + "api/notification/publish";
const getNotificationList = baseUrl + "api/notification/list";
const postNotificationfeedback = baseUrl + "api/notification/feedback";

// 心理辅导
const insertPsyTest = baseUrl + "api/psy/publish";
const getPsyList = baseUrl + "api/psy/getList";
const getPsyquestion = baseUrl + "api/psy/question";
const addPsyResult = baseUrl + "api/psy/addResult";
const getPsyDetail = baseUrl + "api/psy/detail";

// 就业统计
const insertEmployment = baseUrl + "api/employment/publish";
const getEmploymentList = baseUrl + "api/employment/getList";
const addEmploymentRecord = baseUrl + "api/employment/addRecord";
const getEmploymentDetail = baseUrl + "api/employment/detail";

// 工作汇报
const insertWork = baseUrl + "api/work/publish";
const getArticleList = baseUrl + "api/work/getList";
const getArticleDetail = baseUrl + "api/work/detail";

// 图片上传
const imageUpload = baseUrl + "api/file/image";

module.exports = {
    loginUrl,
    getAllColleges,
    getMajorsByCollege,
    studentVerify,
    counselorVerify,

    getStudentInfoById,
    getCounselorInfoById,
    allStudentsOfClass,
    allDormitoriesInfo,
    postDormitoryCheckRecord,
    getApartments,
    getCheckRecordsByDid,
    getCheckstatisticsByUid,
    dormitoryBaseData,

    postHolidayApply,
    getHolidayApplysBySid,
    getOneHolidayApply,
    getLeaveBaseData,
    deleteApply,
    revocationApply,
    getWaitList,
    getOverdueList,
    getLeaveList,
    sickApproval,

    getPoliticsStatusData,

    insertNotification,
    getNotificationList,
    postNotificationfeedback,

    insertPsyTest,
    getPsyList,
    getPsyquestion,
    addPsyResult,
    getPsyDetail,

    insertEmployment,
    getEmploymentList,
    addEmploymentRecord,
    getEmploymentDetail,

    insertWork,
    getArticleList,
    getArticleDetail,
    imageUpload
};
