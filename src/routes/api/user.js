/**
 * @description user API route
 * @author 杨硕
 */

const router = require('koa-router')()
router.prefix('/api/user')
router.post('/register', async (ctx, next) => {
    
})
router.post('/isExist', async (ctx, next) => {
    const {userName} = ctx.request.body
})

module.exports = router