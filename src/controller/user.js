/**
 * @description user controller
 * @author 杨硕
 */
const { registerUserNameNotExistInfo, registerUserNameExistInfo, registerFailInfo } = require('../model/ErrorInfo.js')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { getUserInfo, createUser } = require('../services/user')

/**
 * 判断用户名是否存在
 * @param {string} userName 
 */
async function isExist(userName) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        return new SuccessModel(userInfo)
    } else {
    // registerUserNameExistInfo: {
    //     errno: 10001,
    //     message: '用户名已存在'
    // },
        return new ErrorModel(registerUserNameNotExistInfo)
    }
}

/**
 * 注册用户
 * @param {string} userName 
 * @param {string} password 
 * @param {number} gender 
 */
async function register({ userName, password, gender }) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        return new ErrorModel(registerUserNameExistInfo)       
    }
    try {
        await createUser({ userName, password, gender })
        return new SuccessModel()
    } catch (error) {
        console.error(error.message)
        return new ErrorModel(registerFailInfo)
    }
}

module.exports = {
    isExist,
    register
}