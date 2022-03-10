/**
 * @description user service
 * @author 杨硕
 */

const User = require('../db/model/User')
const doCrypto = require('../utils/cryp')
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
        attributes: ['userName', 'nickName', 'picture', 'city'],
        where: whereOpt
    })
    if (res == null) {
        return res
    }
    const formatRes = formatUser(res.dataValues)
    return formatRes
}

/**
 * 创建用户
 * @param {string} userName 
 * @param {string} password 
 * @param {number} gender 
 * @param {string} nickName 
 */
// 对象解构，传入的时候可以不考虑顺序
async function createUser({ userName, password, gender = 3, nickName }) {
    const res = User.create({
        userName,
        password: doCrypto(password),
        gender,
        nickName: nickName ? nickName : userName
    })
    return res.dataValues
}

module.exports = {
    getUserInfo,
    createUser
}
