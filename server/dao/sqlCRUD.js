const user = {
    queryById: 'select * from users where uid=?',
    add: 'insert into users set ?',
    update: 'update users set ? where uid=?',
};

const student = {
    queryById: 'select * from students where uid=?',
    add: 'insert into students set ?',
    queryByClassNumber: 'select * from students where class_number=?',
    queryDormitoryByClassNumber: 'select dormitory_id from students where class_number=?',
    queryByDormitoryIdInClassNumber: 'select * from students where dormitory_id=?  and  class_number in (?)',
}

const counselor = {
    queryById: 'select * from counselors where uid=?',
    add: 'insert into counselors set ?',
}

const classes = {
    queryByUid: 'select * from classes where uid=?',
    queryByClassNumber: 'select * from classes where class_number=?',
    queryCollege: 'select college from classes group by college',
    queryMajorByCollege: 'select major from classes where college=? group by major',
    queryClassNumByMajorAndClass: 'select class_number from classes where major=? and class=?',
    queryCidBySid: 'select uid from classes where class_number=(select class_number from students where uid = ?)',
}

const dormitory = {
    queryById: 'select * from dormitories where id=?',
    queryApartmentCount: 'select apartment from dormitories where id in (?) group by apartment',
    queryApartments: 'select apartment from dormitories group by apartment',
    queryIdByApartmentAndNum: 'select id from dormitories where apartment=? and dormitory_number=?',
    queryDormitoryInfoById: 'select * from dormitories where id=?',
}

const check = {
    add: 'insert into dormitory_check set ?',
    queryByDid: 'select * from dormitory_check where dId=?',
    queryCountsByDIds: 'select count(*) as recordCounts from dormitory_check where dId in (?)'
}

const holiday = {
    add: 'insert into holiday set ?',
    queryApplysBySid: 'select * from holiday where uid=? order by applyTime desc limit 3',
    queryApplyById: 'select * from holiday where id=?',
    queryWaitAgreeStudents: 'select * from holiday where cid=? and status=1',
    queryLeaveStudents: 'select * from holiday where cid=? and status=2',
    queryOverdueStudents: 'select * from holiday where cid=? and status=3',
    queryOutschoolStudents: 'select * from holiday where cid=? and status=2 and outschool=1',
    deleteApply: 'delete from holiday where id=?',
    revocationApply: 'update holiday set status=4 where id=?',
    sickApproval: 'update holiday set status=?,suggest=? where id=?',
}

const notification = {
    add: 'insert into notification set ?',
    getList: 'select * from notification where cid=? order by releaseDate desc limit 10',
    getNotificationById: 'select * from notification where id=?',
    getUnderwayList: 'select * from notification where cid=? and status=1 order by releaseDate desc',
    feedback: 'update notification set feedback=? where id=?',
}

const psy = {
    add: 'insert into psy_notification set ?',
    getList: 'select * from psy_notification where cid=? order by startDate desc limit 10',
    addResult: 'insert into psy_result set ?',
    getDetail: 'select * from psy_result where nid=?',
}

const employment = {
    add: 'insert into employment_notification set ?',
    getList: 'select * from employment_notification where cid=? order by publishDate desc limit 10',
    addRecord: 'insert into employment_statistics set ?',
    getDetail: 'select * from employment_statistics where nid=?',
}

const work = {
    add: 'insert into job_logging set ?',
    getAllList: 'select * from job_logging where cid=? order by date desc limit 10',
    getList: 'select * from job_logging where cid=? and date like ? order by date desc',
    getDetail: 'select * from job_logging where id=?',
    update: 'update job_logging set ? where id=?',
}

module.exports = {
    user,
    student,
    counselor,
    classes,
    dormitory,
    check,
    holiday,
    notification,
    psy,
    employment,
    work
}