/**
 * @description blog-home route
 * @author 杨硕
 */

const { create } = require('../../controller/blog-home')
const { loginCheck } = require('../../middlewares/loginCheck')
const { genValidator } = require('../../middlewares/validator')
const blogValidate = require('../../validator/blog')

const router = require('koa-router')()
router.prefix('/api/blog')

router.post('/create',loginCheck,genValidator(blogValidate), async (ctx, next) => {
    const { id: userId } = ctx.session.userInfo
    console.log(ctx.session.userInfo)
    const { image, content } = ctx.request.body
    ctx.body = await create({ userId, image, content })
    console.log(ctx.body)
})

module.exports = router