/**
 * @description 404 error
 * @author 杨硕
 */
const router = require('koa-router')()

router.get('/error', async (ctx, next) => {
    // 一定要有await
    await ctx.render('error')
})

router.get('*', async (ctx, next) => {
    await ctx.render('404')
})

module.exports = router