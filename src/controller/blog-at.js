/**
 * @description 微博 @ 关系 controller
 * @author 杨硕
 */

const { PAGE_SIZE } = require('../conf/constant')
const { SuccessModel } = require('../model/ResModel')
const { getAtRelationCount } = require('../services/at-relation')
const {getAtUserBlogList, updateAtRelation} = require('../services/at-relation')
/**
 * 获取 @ 我的微博数量，渲染提到我的数量
 * @param {number} userId userId
 */
async function getAtMeCount(userId) {
    const count = await getAtRelationCount(userId)
    return new SuccessModel({
        count
    })
}

/**
 * 获取 @ 用户的微博列表
 * @param {number} userId
 * @param {number} pageIndex
 */
async function getAtMeBlogList(userId, pageIndex = 0) {
    const result = await getAtUserBlogList({
        userId,
        pageIndex,
        pageSize: PAGE_SIZE
    })
    const { count, blogList } = result

    // 返回
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count
    })
}

/**
 * 标记为已读
 * @param {number} userId userId
 */
async function markAsRead(userId) {
    // 不需要返回 SuccessModel 或者 ErrorModel，所以try catch
    try {
        await updateAtRelation(
            { newIsRead: true },
            { userId, isRead: false }
        )
    } catch (ex) {
        console.error(ex)
    }
}

module.exports = {
    getAtMeCount,
    getAtMeBlogList,
    markAsRead
}
