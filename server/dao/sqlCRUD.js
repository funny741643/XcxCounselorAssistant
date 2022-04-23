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
    queryCollege: 'select college from classes group by college',
    queryMajorByCollege: 'select major from classes where college=? group by major',
    queryClassNumByMajorAndClass: 'select class_number from classes where major=? and class=?',
    queryCidBySid: 'select uid from classes where class_number=(select class_number from students where uid = ?)'
}

const dormitory = {
    queryById: 'select * from dormitories where id=?',
    queryApartmentCount: 'select apartment from dormitories where id in (?) group by apartment',
    queryApartments: 'select apartment from dormitories group by apartment',
    queryIdByApartmentAndNum: 'select id from dormitories where apartment=? and dormitory_number=?',
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
    deleteApply: 'delete from holiday where id=?',
    revocationApply: 'update holiday set status=4 where id=?',
}

module.exports = {
    user,
    student,
    counselor,
    classes,
    dormitory,
    check,
    holiday
}