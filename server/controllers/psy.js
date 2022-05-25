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

const BDI = [
    {
        question: "1.第一题",
        items: [
            {
                name: "我不感到悲伤",
                value: "0",
            },
            {
                name: "我感到悲伤",
                value: "1",
            },
            {
                name: "我始终悲伤，不能自制",
                value: "2",
            },
            {
                name: "我太悲伤或不愉快，不堪忍受",
                value: "3",
            },
        ],
    },
    {
        question: "2.第二题",
        items: [
            {
                name: "我对将来并不失望",
                value: "0",
            },
            {
                name: "对未来我感到心灰意冷",
                value: "1",
            },
            {
                name: "我感到前景黯淡",
                value: "2",
            },
            {
                name: "我觉得将来毫无希望，无法改善",
                value: "3",
            },
        ],
    },
    {
        question: "3.第三题",
        items: [
            {
                name: "我没有感到失败",
                value: "0",
            },
            {
                name: "我觉得比一般人失败要多些",
                value: "1",
            },
            {
                name: "回首往事，我能看到的是很多次失败",
                value: "2",
            },
            {
                name: "我觉得我是一个完全失败的人。",
                value: "3",
            },
        ],
    },
    {
        question: "4.第四题",
        items: [
            {
                name: "我从各种事件中得到很多满足",
                value: "0",
            },
            {
                name: "我不能从各种事件中感受到乐趣",
                value: "1",
            },
            {
                name: "我不能从各种事件中得到真正的满足",
                value: "2",
            },
            {
                name: "我对一切事情不满意或感到枯燥无味",
                value: "3",
            },
        ],
    },
    {
        question: "5.第五题",
        items: [
            {
                name: "我不感到有罪过",
                value: "0",
            },
            {
                name: "我在相当的时间里感到有罪过",
                value: "1",
            },
            {
                name: "我在大部分时间里觉得有罪",
                value: "2",
            },
            {
                name: "我在任何时候都觉得有罪",
                value: "3",
            },
        ],
    },
    {
        question: "6.第六题",
        items: [
            {
                name: "我没有觉得受到惩罚",
                value: "0",
            },
            {
                name: "我觉得可能会受到惩罚",
                value: "1",
            },
            {
                name: "我预料将受到惩罚",
                value: "2",
            },
            {
                name: "我觉得正受到惩罚",
                value: "3",
            },
        ],
    },
    {
        question: "7.第七题",
        items: [
            {
                name: "我对自己并不失望",
                value: "0",
            },
            {
                name: "我对自己感到失望",
                value: "1",
            },
            {
                name: "我讨厌自己",
                value: "2",
            },
            {
                name: "我恨自己",
                value: "3",
            },
        ],
    },
    {
        question: "8.第八题",
        items: [
            {
                name: "我觉得并不比其他人更不好",
                value: "0",
            },
            {
                name: "我要批判自己的弱点和错误",
                value: "1",
            },
            {
                name: "我在所有的时间里都责备自己的错误",
                value: "2",
            },
            {
                name: "我责备自己把所有的事情都弄坏了",
                value: "3",
            },
        ],
    },
    {
        question: "9.第九题",
        items: [
            {
                name: "我没有任何想弄死自己的想法",
                value: "0",
            },
            {
                name: "我有自杀想法，但我不会去做",
                value: "1",
            },
            {
                name: "我想自杀",
                value: "2",
            },
            {
                name: "如果有机会我就自杀",
                value: "3",
            },
        ],
    },
    {
        question: "10.第十题",
        items: [
            {
                name: "我哭泣与往常一样",
                value: "0",
            },
            {
                name: "我比往常哭得多",
                value: "1",
            },
            {
                name: "我一直要哭",
                value: "2",
            },
            {
                name: "我过去能哭，但要哭也哭不出来",
                value: "3",
            },
        ],
    },
    {
        question: "11.第十一题",
        items: [
            {
                name: "和过去相比，我生气并不更多",
                value: "0",
            },
            {
                name: "我比往常更容易生气发火",
                value: "1",
            },
            {
                name: "我觉得所有的时间都容易生气",
                value: "2",
            },
            {
                name: "过去使我生气的事，目前一点也不能使我生气了",
                value: "3",
            },
        ],
    },
    {
        question: "12.第十二题",
        items: [
            {
                name: "我对其他人没有失去兴趣",
                value: "0",
            },
            {
                name: "和过去相比，我对别人的兴趣减少了",
                value: "1",
            },
            {
                name: "我对别人的兴趣大部分失去了",
                value: "2",
            },
            {
                name: "我对别人的兴趣已全部丧失了",
                value: "3",
            },
        ],
    },
    {
        question: "13.第十三题",
        items: [
            {
                name: "我作出决定没什么困难",
                value: "0",
            },
            {
                name: "我推迟作出决定比过去多了",
                value: "1",
            },
            {
                name: "我作决定比以前困难大得多",
                value: "2",
            },
            {
                name: "我再也不能作出决定了",
                value: "3",
            },
        ],
    },
    {
        question: "14.第十四题",
        items: [
            {
                name: "觉得我的外表看上去并不比过去更差",
                value: "0",
            },
            {
                name: "我担心自己看上去显得老了，没有吸引力",
                value: "1",
            },
            {
                name: "我觉得我的外貌有些变化，使我难看了",
                value: "2",
            },
            {
                name: "我相信我看起来很丑陋",
                value: "3",
            },
        ],
    },
    {
        question: "15.第十五题",
        items: [
            {
                name: "我工作和以前一样好",
                value: "0",
            },
            {
                name: "要着手做事，我目前需额外花些力气",
                value: "1",
            },
            {
                name: "无论做什么我必须努力催促自己才行",
                value: "2",
            },
            {
                name: "我什么工作也不能做了",
                value: "3",
            },
        ],
    },
    {
        question: "16.第十六题",
        items: [
            {
                name: "我睡觉与往常一样好",
                value: "0",
            },
            {
                name: "我睡眠不如过去好",
                value: "1",
            },
            {
                name: "我比往常早醒1～2小时，难以再睡",
                value: "2",
            },
            {
                name: "我比往常早醒几个小时，不能再睡",
                value: "3",
            },
        ],
    },
    {
        question: "17.第十七题",
        items: [
            {
                name: "我并不感到比往常更疲乏",
                value: "0",
            },
            {
                name: "我比过去更容易感到疲乏无力",
                value: "1",
            },
            {
                name: "几乎不管做什么，我都感到疲乏无力",
                value: "2",
            },
            {
                name: "我太疲乏无力，不能做任何事情",
                value: "3",
            },
        ],
    },
    {
        question: "18.第十八题",
        items: [
            {
                name: "我的食欲和往常一样",
                value: "0",
            },
            {
                name: "我的食欲不如过去好",
                value: "1",
            },
            {
                name: "我目前的食欲差得多了",
                value: "2",
            },
            {
                name: "我一点也没有食欲了",
                value: "3",
            },
        ],
    },
    {
        question: "19.第十九题",
        items: [
            {
                name: "最近我的体重并无很大减轻",
                value: "0",
            },
            {
                name: "我体重下降2.27 千克以上",
                value: "1",
            },
            {
                name: "我体重下降5.54 千克以上",
                value: "2",
            },
            {
                name: "我体重下降7.81 千克以上",
                value: "3",
            },
        ],
    },
    {
        question: "20.第二十题",
        items: [
            {
                name: "我对健康状况并不比往常更担心",
                value: "0",
            },
            {
                name: "我担心身体上的问题，如疼痛、胃不适或便秘",
                value: "1",
            },
            {
                name: "我很担心身体问题，想别的事情很难",
                value: "2",
            },
            {
                name: "我对身体问题如此担忧，以致不能想其他任何事情",
                value: "3",
            },
        ],
    },
    {
        question: "21.第二十一题",
        items: [
            {
                name: "我没有发现自己对性的兴趣最近有什么变化",
                value: "0",
            },
            {
                name: "我对性的兴趣比过去降低了",
                value: "1",
            },
            {
                name: "我现在对性的兴趣大大下降",
                value: "2",
            },
            {
                name: "我对性的兴趣已经完全丧失",
                value: "3",
            },
        ],
    },
];

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

function getBDIRet(array) {
    let score = 0;
    array.forEach(item => {
        score = score + item;
    });
    let ret = "";
    if (score <= 10) {
        ret = "无抑郁";
    } else if (score <= 15) {
        ret = "轻度抑郁";
    } else if (score <= 25) {
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
        } else if (type === "BDI") {
            const { score, ret } = getBDIRet(result);
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

    delete: async function (data) {
        const { id } = data;
        const ret = await psyModel.delete(id);
        return ret;
    },
};
