/**
 * @description blog service
 * @author 杨硕
 */

const { Blog } = require('../db/model/index')
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

module.exports = {
    createBlog
}