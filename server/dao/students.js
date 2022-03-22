const _ = require('./query');
const $sqlQueryStu = require('./sqlCRUD').student;
const $sqlQueryUser = require('./sqlCRUD').user;

const student = {
    insertStudentInfo(uid, studentInfo, role) {
       studentInfo = JSON.parse(studentInfo)
        const insertObj = {
            'uid': uid,
            'sclass_number': '',
            ...studentInfo
        }
        _.query($sqlQueryUser.update, [{urole: role}, uid]).then((res) => {
            console.log('角色更新成功');
        })
        return _.query($sqlQueryStu.queryById, uid)
            .then(function(res) {
                if (res && res[0]) {
                    return new Promise((resolve, reject) => {
                        reject('您已经认证过了！！')
                    })
                } else {
                    return _.query($sqlQueryStu.add, insertObj);
                }
            }).then(function() {
                const resStudentObj = Object.assign({}, studentInfo)
                return {
                    studentInfo: resStudentObj,
                    role
                }
            }).catch(function(e) {
                return {
                    errmsg: JSON.stringify(e)
                }
            })
    },

    queryStudentByClassNumber(class_number) {
        return _.query($sqlQueryStu.queryByClassNumber, class_number)
    }
}

module.exports = student;