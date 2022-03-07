const crypto = require('crypto');

module.exports = {
    // 解密用户数据
    decryptByAES: function(encrypted, key, iv) {
        encrypted = Buffer.from(encrypted, 'base64');
        key = Buffer.from(key, 'base64');
        iv = Buffer.from(iv, 'base64')

        const decipher = crypto.createDecipheriv('aes-128-ccm', key, iv)
        let decrypted = decipher.update(encrypted, 'base64', 'utf-8')
        decrypted += decipher.final('utf-8')
        return decrypted
    },

    // 加密生成小程序自己的用户登录标识
    encryptSha1: function (data) {
        return crypto.createHash('sha1').update(data, 'utf8').digest('hex')
    }
}