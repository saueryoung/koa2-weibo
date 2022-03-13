/**
 * @description 用户关系controller
 * @author 杨硕
 */

const { getUsersByFollower } = require('../services/user-relation')
const { SuccessModel } = require('../model/ResModel')

/**
 * 根据用户id，获取用户的所有粉丝
 * @param {number} userId 
 */
async function getFans(userId) {
    const { count, userList } = await getUsersByFollower(userId)
    return new SuccessModel({
        count,
        userList
    })
}

module.exports = {
    getFans
}