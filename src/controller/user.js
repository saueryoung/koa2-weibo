/**
 * @description user controller
 * @author 杨硕
 */
const { registerUserNameNotExistInfo, registerUserNameExistInfo, registerFailInfo, loginFailInfo, deleteBlogFailInfo, changeInfoFailInfo, changePasswordFailInfo } = require('../model/ErrorInfo.js')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { getUserInfo, createUser, deleteUser, updateUser } = require('../services/user')
const doCrypto = require('../utils/cryp.js')

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

/**
 * 登录
 * @param {Object} ctx 
 * @param {string} userName 
 * @param {string} password 
 */
async function login(ctx, userName, password) {
    const userInfo = await getUserInfo(userName, doCrypto(password))
    if (!userInfo) {
        return new ErrorModel(loginFailInfo)
    }
    // 第一次登录，初始化
    if (ctx.session.userInfo == null) {
        ctx.session.userInfo = userInfo
    }
    return new SuccessModel(userInfo)
}

/**
 * 删除用户
 * @param {string} userName 
 * @returns 
 */
async function deleteCurUser(userName) {
    const res = await deleteUser(userName)
    if (res) {
        return new SuccessModel()       
    }
    return new ErrorModel(deleteBlogFailInfo)
}

/**
 * 更改用户信息
 * @param {Object} ctx 
 * @param {Object} 用户信息 nickName, city, picture
 */
async function changeInfo(ctx, { nickName, city, picture }) {
    const { userName } = ctx.session.userInfo
    // 没昵称就默认userName
    if (!nickName) {
        nickName = userName
    }
    const res = await updateUser({
        newNickName: nickName,
        newCity: city,
        newPicture: picture
    }, {
        userName
    })
    // 记得修改完mysql后修改redis里存储的内容
    if (res) {
        Object.assign(ctx.session.userInfo, {
            nickName,
            city,
            picture
        })
        return new SuccessModel()
    }
    return new ErrorModel(changeInfoFailInfo)
}

/**
 * 更改密码
 * @param {string} userName 
 * @param {string} password 
 * @param {string} newPassword 
 */
async function changePassword(userName, password, newPassword) {
    const res = await updateUser({ newPassword:doCrypto(newPassword) }, { userName, password:doCrypto(password)})
    if (res) {
        return new SuccessModel()
    }
    return new ErrorModel(changePasswordFailInfo)
}

/**
 * 退出登录
 * @param {Object} ctx 
 */
async function logout(ctx) {
    delete ctx.session.userInfo
    return new SuccessModel()
}

module.exports = {
    isExist,
    register,
    login,
    deleteCurUser,
    changeInfo,
    changePassword,
    logout
}
