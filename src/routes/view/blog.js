/**
 * @description blog
 * @author 杨硕
 */

const { loginRedirect } = require('../../middlewares/loginCheck')

const router = require('koa-router')()

router.get('/',loginRedirect, async (ctx, next) => {
    // 一定要有await
    await ctx.render('index',{})
})

module.exports = router
