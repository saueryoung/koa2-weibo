/**
 * @description user service
 * @author 杨硕
 */

const User = require('../db/model/User')
const {formatUser} = require('./_format')
/**
 * 获取并格式化用户信息
 * @param {string} userName 
 * @param {string} password 
 */
async function getUserInfo(userName,password) {
    let whereOpt = {
        userName
    }
    if (password) {
        Object.assign(whereOpt,{password})
    }
    const res = await User.findOne({
        attributes: ['name', 'userName', 'nickName', 'picture', 'city'],
        where: whereOpt
    })
    if (res == null) {
        return res
    }
    const formatRes = formatUser(res)
    return formatRes
}

module.exports = {
    getUserInfo
}
