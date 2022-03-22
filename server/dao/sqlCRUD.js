const user = {
    queryById: 'select * from users where uid=?',
    add: 'insert into users set ?',
    update: 'update users set ? where uid=?',
};

const student = {
    queryById: 'select * from students where uid=?',
    add: 'insert into students set ?',
    queryByClassNumber: 'select * from students where class_number=?'
}

const counselor = {
    queryById: 'select * from counselors where uid=?',
    add: 'insert into counselors set ?',
}

const classes = {
    queryByUid: 'select * from classes where uid=?',
}

module.exports = {
    user,
    student,
    counselor,
    classes
}