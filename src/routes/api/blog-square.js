/**
 * @description 广场 API 路由
 * @author 杨硕
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginCheck')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getBlogListStr } = require('../../utils/blog')

router.prefix('/api/square')

// 加载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
    let { pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)  // 转换 number 类型
    const res = await getSquareBlogList(pageIndex)
    // 渲染模板
    res.data.blogListTpl = getBlogListStr(res.data.blogList)
    ctx.body = res
})

module.exports = router
