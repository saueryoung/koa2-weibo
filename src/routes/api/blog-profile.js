/**
 * @description blog-profile API
 * @author 杨硕
 */

const { create } = require('../../controller/blog-home')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { follow, unFollow } = require('../../controller/user-relation')
const { loginCheck } = require('../../middlewares/loginCheck')
const { genValidator } = require('../../middlewares/validator')
const { getBlogListStr } = require('../../utils/blog')
const blogValidate = require('../../validator/blog')

const router = require('koa-router')()
router.prefix('/api/profile')

// 点击个人主页的加载更多时触发
router.get('/loadMore/:userName/:pageIndex', async (ctx, next) => {
    const { userName, pageIndex } = ctx.params
    const res = await getProfileBlogList(userName, pageIndex)
    res.data.blogListTpl = getBlogListStr(res.data.blogList)
    ctx.body = res
})

// 点击关注时触发
router.post('/follow', loginCheck, async (ctx, next) => {
    const { id: myUserId } = ctx.session.userInfo
    const { userId: curUserId } = ctx.request.body
    ctx.body = await follow(myUserId,curUserId)
})

// 点击取关时触发
router.post('/unFollow', loginCheck, async (ctx, next) => {
    const { id: myUserId } = ctx.session.userInfo
    const { userId: curUserId } = ctx.request.body
    ctx.body = await unFollow(myUserId,curUserId)
})

module.exports = router
