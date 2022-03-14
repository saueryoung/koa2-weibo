/**
 * @description blog-home controller
 * @author 杨硕
 */
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlog, getFollowersBlogList } = require('../services/blog')
const xss = require('xss')
const { PAGE_SIZE } = require('../conf/constant')

/**
 * 创建微博
 * @param {number} userId 
 * @param {string} content 
 * @param {string} image 
 */
async function create({userId, content, image}) {
    try {
        const blog = await createBlog({
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

/**
 * 获取首页微博列表
 * @param {number} userId 
 * @param {number} pageIndex 
 */
async function getHomeBlogList(userId, pageIndex =  0) {
    const { count, blogList } = await getFollowersBlogList({
        userId,
        pageIndex,
        pageSize: PAGE_SIZE
    })
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        count,
        pageSize: PAGE_SIZE,
        pageIndex: pageIndex
    })
}

module.exports = {
    create,
    getHomeBlogList
}