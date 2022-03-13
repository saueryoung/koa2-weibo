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

module.exports = {
    getUsersByFollower
}