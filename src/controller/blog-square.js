/**
 * @description 广场页 controller
 * @author 杨硕
 */

const { PAGE_SIZE } = require('../conf/constant')
const { SuccessModel } = require('../model/ResModel')
const { getSquareCacheList } = require('../cache/blog')

/**
 * 获取广场的微博列表
 * @param {number} pageIndex pageIndex
 */
async function getSquareBlogList(pageIndex = 0) {
    const res = await getSquareCacheList(pageIndex, PAGE_SIZE)
    const blogList = res.blogList
    // 拼接返回数据
    // console.log(res)
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count: res.count
    })
}

module.exports = {
    getSquareBlogList
}