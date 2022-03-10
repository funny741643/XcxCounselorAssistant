const crypto = require('crypto');
const CryptoJS = require('crypto-js')
const Base64 = require('js-base64')

module.exports = {
    // 解密用户数据
    // decryptByAES: function(encrypted, key, iv) {
    //     encrypted = Buffer.from(encrypted, 'base64');
    //     key = Buffer.from(key, 'base64');
    //     iv = Buffer.from(iv, 'base64')

    //     const decipher = crypto.createDecipheriv('aes-128-ccm', key, iv)
    //     let decrypted = decipher.update(encrypted, 'base64', 'utf-8')
    //     decrypted += decipher.final('utf-8')
    //     return decrypted
    // },

    decryptByAES: function(encryptedData, sessionKey, ivv) {
        let key = CryptoJS.enc.Base64.parse(sessionKey)
        let iv = CryptoJS.enc.Base64.parse(ivv)
        let decrypt = CryptoJS.AES.decrypt(encryptedData, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        })
        return JSON.parse(Base64.decode(CryptoJS.enc.Base64.stringify(decrypt)))
    },

    // 加密生成小程序自己的用户登录标识
    encryptSha1: function (data) {
        return crypto.createHash('sha1').update(data, 'utf8').digest('hex')
    }
}