const user = {
    queryById: 'select * from users where uid=?',
    add: 'insert into users set ?',
    update: 'update users set ? where uid=?',
};

const student = {
    queryById: 'select * from students where uid=?',
    add: 'insert into students set ?',
}

const counselor = {
    queryById: 'select * from counselors where uid=?',
    add: 'insert into counselors set ?',
}

module.exports = {
    user,
    student,
    counselor
}