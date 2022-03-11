/**
 * @description blog-home controller
 * @author 杨硕
 */
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlog } = require('../services/blog')
const xss = require('xss')

/**
 * 创建微博
 * @param {number} userId 
 * @param {string} content 
 * @param {string} image 
 */
async function create({userId, content, image}) {
    try {
        const blog = createBlog({
            userId,
            content: xss(content),
            image
        })
        return new SuccessModel(blog)
    } catch (err) {
        console.error(err.message, err.stack)
        return new ErrorModel(createBlogFailInfo)
    }
}

module.exports = {
    create
}