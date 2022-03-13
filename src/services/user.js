/**
 * @description user service
 * @author 杨硕
 */

const {User} = require('../db/model/index')
const doCrypto = require('../utils/cryp')
const { addFollower } = require('./user-relation')
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
        attributes: ['id','userName', 'nickName', 'picture', 'city'],
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
    const res = await User.create({
        userName,
        password: doCrypto(password),
        gender,
        nickName: nickName ? nickName : userName
    })
    const data = res.dataValues
    // 自己关注自己，方便首页渲染用
    addFollower(data.id,data.id)
    return data
}

/**
 * 删除用户
 * @param {string} userName 
 */
async function deleteUser(userName) {
    const res = await User.destroy({
        where: {
            userName
        }
    })
    // res代表删了几行
    return res > 0
}

/**
 * 更新用户信息
 * @param {Object} newPassword,newNickName,newCity,newPicture
 * @param {Object} password,userName
 */

// 既要可以修改密码，也要能修改其他信息
async function updateUser({
    newPassword,newNickName,newCity,newPicture
}, {
    password,userName
}) {
    // 修改的内容是啥
    const updateData = {}
    if (newPassword) {
        updateData.password = newPassword
    }
    if (newNickName) {
        updateData.nickName = newNickName
    }
    if (newCity) {
        updateData.city = newCity
    }
    if (newPicture) {
        updateData.picture = newPicture
    }
    // 给哪个用户修改
    const whereOpt = { userName }
    if (password) {
        whereOpt.password = password
    }
    const res = await User.update(updateData, {
        where: whereOpt
    })
    return res[0] > 0
}

module.exports = {
    getUserInfo,
    createUser,
    deleteUser,
    updateUser
}
