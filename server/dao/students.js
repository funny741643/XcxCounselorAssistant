const _ = require('./query');
const $sqlQuery = require('./sqlCRUD').student;

const student = {
    insertStudentInfo(uid, studentInfo, role) {
       studentInfo = JSON.parse(studentInfo)
        const insertObj = {
            'uid': uid,
            'sname': studentInfo.name,
            'stelephone': studentInfo.phonenumber,
            'snumber': studentInfo.number,
            'scollege': studentInfo.college,
            'smajor': studentInfo.major,
            'sclass': studentInfo.class,
            'sclass_number': ''
        }
        return _.query($sqlQuery.queryById, uid)
            .then(function(res) {
                console.log('res', res)
                console.log('insertObj', insertObj);
                if (res && res[0]) {
                    return {
                        errmsg: '已有数据，请进行更新操作'
                    }
                } else {
                    return _.query($sqlQuery.add, insertObj);
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
    }
}

module.exports = student;