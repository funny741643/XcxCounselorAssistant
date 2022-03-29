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
}

const dormitory = {
    queryById: 'select * from dormitories where id=?',
}

const check = {
    add: 'insert into dormitory_check set ?',
    queryByDid: 'select * from dormitory_check where dId=?'
}

module.exports = {
    user,
    student,
    counselor,
    classes,
    dormitory,
    check
}