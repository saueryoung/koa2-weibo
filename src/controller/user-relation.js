/**
 * @description 用户关系controller
 * @author 杨硕
 */

const { getUsersByFollower, addFollower, deleteFollower, getFollowersByUser } = require('../services/user-relation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { addFollowerFailInfo, deleteFollowerFailInfo } = require('../model/ErrorInfo')

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

/**
 * 根据用户id，获取用户的所有关注者
 * @param {number} userId 
 */
async function getFollowers(userId) {
    const { count, userList } = await getFollowersByUser(userId)
    return new SuccessModel({
        count,
        userList
    })
}

/**
 * 关注
 * @param {number} myUserId 当前用户id
 * @param {number} curUserId 被关注者的id
 */
async function follow(myUserId, curUserId) {
    try {
        await addFollower(myUserId,curUserId)
        return new SuccessModel()
    } catch (err) {
        console.error(err.message, err.stack)
        return new ErrorModel(addFollowerFailInfo)
    }
}

/**
 * 取关
 * @param {number} myUserId 当前用户id
 * @param {number} curUserId 被关注者的id
 */
async function unFollow(myUserId, curUserId) {
    const res = await deleteFollower(myUserId, curUserId)
    if (res) {
        return new SuccessModel()
    }
    return new ErrorModel(deleteFollowerFailInfo)
}

module.exports = {
    getFans,
    getFollowers,
    follow,
    unFollow
}