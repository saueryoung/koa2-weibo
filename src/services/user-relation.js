/**
 * @description 用户关系 service
 * @author 杨硕
 */

const { User } = require('../db/model')
const { UserRelation } = require('../db/model/index')
const { formatUser } = require('../services/_format')

/**
 * 根据被关注者的id获取所有粉丝信息
 * @param {number} followerId 
 */
async function getUsersByFollower(followerId) {
    const res = await User.findAndCountAll({
        attributes: ['id', 'userName', 'nickName', 'picture'],
        order: [
            ['id','desc']
        ],
        // 不是includes!!!!
        include: [
            {
                model: UserRelation,
                where: {
                    followerId
                }
            }
        ]
    })
    let userList = res.rows.map(user => user.dataValues)
    userList = formatUser(userList)
    console.log(followerId)
    return {
        count: res.count,
        userList
    }
}

/**
 * 添加关注关系
 * @param {number} userId 用户id
 * @param {number} followerId 被关注者id
 */
async function addFollower(userId, followerId) {
    const res = await UserRelation.create({
        userId,
        followerId
    })
    return res.dataValues
}

/**
 * 删除关注关系
 * @param {number} userId 用户id
 * @param {number} followerId 被关注者id
 */
async function deleteFollower(userId, followerId) {
    const res = await UserRelation.destroy({
        where: {
            userId,
            followerId
        }
    })
    return res > 0
}

module.exports = {
    getUsersByFollower,
    addFollower,
    deleteFollower
}