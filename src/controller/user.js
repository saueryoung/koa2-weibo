/**
 * @description user controller
 * @author 杨硕
 */
const { registerUserInfoNotExistInfo } = require('../model/ErrorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {getUserInfo} = require('../services/user')
/**
 * 判断用户名是否存在
 * @param {string} userName 
 */
async function isExist(userName) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        return new SuccessModel(userInfo)
    } else {
        return new ErrorModel(registerUserInfoNotExistInfo)
    }
}

module.exports = {
    isExist
}