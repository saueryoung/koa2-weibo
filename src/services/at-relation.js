/**
 * @description 微博 @ 用户关系 service
 * @author 杨硕
 */

const { restart } = require('pm2')
const { AtRelation,User } = require('../db/model/index')
const { formatBlog,formatUser } = require('./_format')
const {Blog} = require('../db/model/index')
/**
  * 创建微博 @ 用户的关系
  * @param {number} blogId 
  * @param {number} userId 
  */
async function createAtRelation(blogId, userId) {
    const res = await AtRelation.create({
        blogId,
        userId
    })
    return res.dataValues
}

/**
 * 获取 @ 用户的微博数量（未读的）
 * @param {number} userId userId
 */
async function getAtRelationCount(userId) {
    const res = await AtRelation.findAndCountAll({
        where: {
            userId,
            isRead: false
        }
    })
    return res.count
    // res.rows
}

/**
 * 获取 @ 用户的微博列表
 * @param {Object} { userId, pageIndex, pageSize = 10 }
 */
async function getAtUserBlogList({ userId, pageIndex, pageSize = 10 }) {
    //由at关系的blogid获得Blog，Blog里面带有User信息，User不进入筛选
    const res = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageSize * pageIndex,
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: AtRelation,
                attributes: ['userId', 'blogId'],
                where: { userId }
            },
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture']
            }
        ]
    })
    let blogList = res.rows.map(row => row.dataValues)
    blogList = formatBlog(blogList)
    blogList = blogList.map(blogItem => {
        blogItem.user = formatUser(blogItem.user.dataValues)
        return blogItem
    })

    return {
        count: res.count,
        blogList
    }
}

/**
 * 更新 AtRelation
 * @param {Object} param0 更新内容
 * @param {Object} param1 查询条件
 */
async function updateAtRelation(
    { newIsRead }, // 要更新的内容
    { userId, isRead } // 条件
) {

    const updateData = {}
    if (newIsRead) {
        updateData.isRead = newIsRead
    }

    const whereData = {}
    if (userId) {
        whereData.userId = userId
    }
    if (isRead) {
        whereData.isRead = isRead
    }

    const result = await AtRelation.update(updateData, {
        where: whereData
    })
    return result[0] > 0
}


module.exports = {
    createAtRelation,
    getAtRelationCount,
    getAtUserBlogList,
    updateAtRelation
}

