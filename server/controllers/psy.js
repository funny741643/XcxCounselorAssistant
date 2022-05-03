const moment = require("moment");
const psyModel = require("../dao/psy");
const classModel = require("../dao/classes");
const studentModel = require("../dao/students");
const counselorMethods = require("./counselors");

const SDSItems = [
    {
        name: "很少",
        value: "1",
    },
    {
        name: "有时",
        value: "2",
    },
    {
        name: "经常",
        value: "3",
    },
    {
        name: "持续",
        value: "4",
    },
];

const SDS = [
    { question: "1. 我觉得闷闷不乐，情绪低沉", items: SDSItems },
    { question: "2. 我觉得一天之中早晨最好", items: SDSItems },
    { question: "3．我一阵阵哭出来或觉得想哭", items: SDSItems },
    { question: "4．我晚上睡眠不好", items: SDSItems },
    { question: "5．我吃得跟平常一样多", items: SDSItems },
    { question: "6．我与异性密切接触时和以往一样感到愉快", items: SDSItems },
    { question: "7．我发觉我的体重下降", items: SDSItems },
    { question: "8．我有便秘的苦恼", items: SDSItems },
    { question: "9． 我心跳比平时快", items: SDSItems },
    { question: "10．我无缘无故地感到疲乏", items: SDSItems },
    { question: "11．我的头脑跟平常一样清楚", items: SDSItems },
    { question: "12．我觉得经常做的事情并没有困难", items: SDSItems },
    { question: "13．我觉得不安而平静不下来", items: SDSItems },
    { question: "14．我对将来抱有希望", items: SDSItems },
    { question: "15．我比平常容易生气激动", items: SDSItems },
    { question: "16．我觉得作出决定是容易的", items: SDSItems },
    { question: "17．我觉得自己是个有用的人，有人需要我", items: SDSItems },
    { question: "18．我的生活过得很有意思", items: SDSItems },
    { question: "19．我认为如果我死了别人会生活得好些", items: SDSItems },
    { question: "20．我平常感兴趣的事我仍然照样感兴趣", items: SDSItems },
];

const BDI = {};

const questions = {
    SDS: SDS,
    BDI: BDI,
};

function getSDSRet(array) {
    const total =
        50 -
        (array[1] +
            array[4] +
            array[5] +
            array[10] +
            array[11] +
            array[13] +
            array[15] +
            array[16] +
            array[17] +
            array[19]) +
        (array[2] +
            array[3] +
            array[6] +
            array[7] +
            array[8] +
            array[9] +
            array[12] +
            array[14] +
            array[18] +
            array[0]);
    const score = total / 80;
    let ret = "";
    if (score < 0.5) {
        ret = "无抑郁";
    } else if (score < 0.6) {
        ret = "轻度抑郁";
    } else if (score < 0.7) {
        ret = "中度抑郁";
    } else {
        ret = "重度抑郁";
    }
    return { score, ret };
}

module.exports = {
    getQuestion: function (data) {
        const { type } = data;
        return questions[type];
    },

    publish: async function (data) {
        const { type, endTime, cid } = data;
        let endDate = moment(endTime, "YYYY-MM-DD").format("YYYY-MM-DD");
        let startDate = moment().format("YYYY-MM-DD");
        let status = 1;
        const query = {
            type,
            endDate,
            startDate,
            cid,
            status,
        };
        const ret = await psyModel.publish(query);
        return ret;
    },

    getList: async function (data) {
        let isStudent = false;
        let { cid, sid } = data;
        if (sid) {
            isStudent = true;
            let res = await classModel.getCidBySid(sid);
            cid = res[0].uid;
        }
        const ret = await psyModel.getList(cid);
        if (isStudent) {
            for (let i = 0; i < ret.length; i++) {
                let { id } = ret[i];
                let finishedDetail = await psyModel.getDetail(id);
                let sids = finishedDetail.map((item) => item.sid);
                if (sids.includes(sid)) {
                    ret[i].finished = true;
                } else {
                    ret[i].finished = false;
                }
            }
        }
        return ret;
    },

    addResult: async function (data) {
        console.log(data);
        let res;
        let { result, sid, nid, type } = data;
        result = result.map((item) => {
            return +item;
        });
        if (type === "SDS") {
            const { score, ret } = getSDSRet(result);
            const data = {
                score,
                sid,
                nid,
                type,
                result: ret,
            };
            res = await psyModel.addResult(data);
        }
        return res;
    },

    getDetail: async function (data) {
        const { id, cid } = data;
        const ret = await psyModel.getDetail(id);
        const totalStudents = await counselorMethods.getTotalStudents(cid);
        const noDepression = ret.filter((item) => {
            return item.result === "无抑郁";
        });
        const mildDepression = ret.filter((item) => {
            return item.result === "轻度抑郁";
        });
        const moderateDepression = ret.filter((item) => {
            return item.result === "中度抑郁";
        });
        const severeDepression = ret.filter((item) => {
            return item.result === "重度抑郁";
        });

        const noDepressionStudents = [];
        for (let i = 0; i < noDepression.length; i++) {
            let student = await studentModel.getStudentBySid(noDepression[i].sid);
            noDepressionStudents.push(student[0]);
        }

        const mildDepressionStudents = [];
        for (let i = 0; i < mildDepression.length; i++) {
            let student = await studentModel.getStudentBySid(mildDepression[i].sid);
            mildDepressionStudents.push(student[0]);
        }

        const moderateDepressionStudents = [];
        for (let i = 0; i < moderateDepression.length; i++) {
            let student = await studentModel.getStudentBySid(moderateDepression[i].sid);
            moderateDepressionStudents.push(student[0]);
        }

        const severeDepressionStudents = [];
        for (let i = 0; i < severeDepression.length; i++) {
            let student = await studentModel.getStudentBySid(severeDepression[i].sid);
            severeDepressionStudents.push(student[0]);
        }

        const finishedStudents = [];
        for (let i = 0; i < ret.length; i++) {
            let student = await studentModel.getStudentBySid(ret[i].sid);
            finishedStudents.push(student[0]);
        }

        const totalStudentsId = totalStudents.map((item) => {
            return item.uid;
        });

        const finishedStudentsId = finishedStudents.map((item) => {
            return item.uid;
        });

        const notTestStudentsId = totalStudentsId.filter((item) => {
            return finishedStudentsId.indexOf(item) === -1;
        });

        const notTestStudents = [];
        for (let i = 0; i < notTestStudentsId.length; i++) {
            let student = await studentModel.getStudentBySid(notTestStudentsId[i]);
            notTestStudents.push(student[0]);
        }

        return {
            finishedStudents,
            notTestStudents,
            noDepressionStudents,
            mildDepressionStudents,
            moderateDepressionStudents,
            severeDepressionStudents,
        };
    },
};
