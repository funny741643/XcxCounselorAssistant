const http = require("axios");
const crypto = require("crypto");
const { appConfig: config } = require("../conf/app");
const { decryptByAES, encryptSha1 } = require("../util");
const { saveUserInfo } = require('../controllers/users');

function authorizeMiddleware(req, res, next) {
    return authMiddleware(req).then(function (result) {
        res["auth_data"] = result;
        return next();
    });
}

function authMiddleware(req) {
    const { appid, secret } = config;

    const {
        code, // 临时登录凭证
        encryptedData, // 用户敏感信息
        iv, // 解密算法向量
    } = req.query;

    // 检查参数完整性
    if ([code, encryptedData, iv].some((item) => !item)) {
        return {
            result: -1,
            errmsg: "缺少参数字段，请检查后重试",
        };
    }

    return getSessionKey(code, appid, secret)
        .then((resData) => {
            const { session_key } = resData;
            // 生成小程序自己的用户登录标识
            const skey = encryptSha1(session_key);

            // 解密获取用户的敏感信息
            let decryptedData = decryptByAES(encryptedData, session_key, iv);

            // console.log(decryptedData)

            // 存入用户数据表中
            return saveUserInfo({
                userInfo: decryptedData,
                session_key,
                skey
            })
        })
        .catch((err) => {
            return {
                result: -3,
                errmsg: JSON.stringify(err),
            };
        });
}

// 调用接口获取登录凭证（code）。通过凭证进而换取用户登录态信息，
// 包括用户的唯一标识（openid）及本次登录的会话密钥（session_key）等。用户数据的加解密通讯需要依赖会话密钥完成。

/**
 * 获取当前用户session_key
 * @param {*用户临时登录凭证} code
 * @param {*小程序appid} appid
 * @param {*小程序密钥} appSecret
 */
function getSessionKey(code, appid, appSecret) {
    const opt = {
        method: "GET",
        url: "https://api.weixin.qq.com/sns/jscode2session",
        params: {
            appid: appid,
            secret: appSecret,
            js_code: code,
            grant_type: "authorization_code",
        },
    };

    return http(opt).then(function (response) {
        const data = response.data;

        if (!data.openid || !data.session_key || data.errcode) {
            return {
                result: -2,
                errmsg: data.errmsg || "返回数据字段不完整",
            };
        } else {
            return data;
        }
    });
}
module.exports = {
    authorizeMiddleware,
};
