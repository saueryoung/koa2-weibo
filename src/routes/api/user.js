/**
 * @description user API route
 * @author 杨硕
 */

const { isExist, register } = require('../../controller/user')
const { genValidator } = require('../../middlewares/validator')
const userValidate = require('../../validator/user')

const router = require('koa-router')()
router.prefix('/api/user')

router.post('/register', genValidator(userValidate), async (ctx, next) => {
    const { userName, password, gender } = ctx.request.body
    ctx.body = await register({userName,password,gender})
})

router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    ctx.body = await isExist(userName)
})

module.exports = router