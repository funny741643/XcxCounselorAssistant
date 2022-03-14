const http = require("axios");
const { appConfig: config } = require("../conf/app");
const { encryptSha1 } = require("../util");
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
        userInfo
    } = req.query;

    return getSessionKey(code, appid, secret)
        .then((resData) => {
            const { session_key, openid } = resData;
            // 生成小程序自己的用户登录标识
            const skey = encryptSha1(session_key);

            // 存入用户数据表中
            return saveUserInfo({
                userInfo,
                session_key,
                skey,
                openid
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
