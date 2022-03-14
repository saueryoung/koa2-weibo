/**
 * @description blog-home API
 * @author 杨硕
 */

const { create, getHomeBlogList } = require('../../controller/blog-home')
const { loginCheck } = require('../../middlewares/loginCheck')
const { genValidator } = require('../../middlewares/validator')
const blogValidate = require('../../validator/blog')
const { getBlogListStr } = require('../../utils/blog')

const router = require('koa-router')()
router.prefix('/api/blog')

router.post('/create',loginCheck,genValidator(blogValidate), async (ctx, next) => {
    const { id: userId } = ctx.session.userInfo
    const { image, content } = ctx.request.body
    ctx.body = await create({ userId, image, content })
})

// 加载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
    let { pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)  // 转换 number 类型
    const {id: userId} = ctx.session.userInfo
    const res = await getHomeBlogList(userId,pageIndex)
    // 渲染模板
    res.data.blogListTpl = getBlogListStr(res.data.blogList,true)
    ctx.body = res
})

module.exports = router
