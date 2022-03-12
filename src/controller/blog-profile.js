/**
 * @description 个人主页 controller
 * @author 杨硕
 */

const { getBlogListByUser } = require('../services/blog')
const {PAGE_SIZE} = require('../conf/constant')
const { SuccessModel } = require('../model/ResModel')
/**
 * 获取个人主页的博客列表
 * @param {string} userName 
 * @param {number} pageIndex 
 */
async function getProfileBlogList(userName, pageIndex = 0) {
    const res = await getBlogListByUser({
        userName,
        pageIndex,
        pageSize: PAGE_SIZE
    })
    const blogList = res.blogList
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        count: res.count,
        pageSize: PAGE_SIZE,
        pageIndex: pageIndex
    })
}

module.exports = {
    getProfileBlogList
}
