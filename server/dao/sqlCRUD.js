const user = {
    queryById: 'select * from users where uid=?',
    add: 'insert into users set ?',
    hasUser: 'select * from users where uid=?',
    update: 'update users set ? where uid=?'
}

module.exports = {
    user
}