/**
 * @description blog service
 * @author 杨硕
 */

const { Blog,User } = require('../db/model/index')
const { formatUser, formatBlog } = require('./_format')
/**
 * 创建博客
 * @param {Object} userId, content, image 
 */
async function createBlog({ userId, content, image }) {
    const res = await Blog.create({
        userId,
        content,
        image
    })
    return res.dataValues
}

/**
 * 通过用户名获取博客列表
 * @param {Object} {userName,pageIndex = 0, pageSize = 10 }
 */
async function getBlogListByUser({ userName, pageIndex = 0, pageSize = 10 }) {
    const userWhereOpts = {}
    if (userName) {
        userWhereOpts.userName = userName
    }
    const res = await Blog.findAndCountAll({
        limit: pageSize, // 每页多少条
        offset: pageSize * pageIndex, // 跳过多少条
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                // 不是model: 'User'!!!!!!
                model: User,
                attributes: ['userName', 'nickName', 'picture'],
                where: userWhereOpts
            }
        ]
    })
    let blogList = res.rows.map(row => row.dataValues)
    blogList = blogList.map(blogItem => {
        const user = blogItem.user.dataValues
        blogItem.user = formatUser(user)
        return blogItem
    })
    return {
        count: res.count,
        blogList: formatBlog(blogList)
    }
}

module.exports = {
    createBlog,
    getBlogListByUser
}