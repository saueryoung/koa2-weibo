const { loginRedirect } = require('../../middlewares/loginCheck')

/**
 * @description view user router
 * @author 杨硕
 */
const router = require('koa-router')()

/**
 * 获取登录信息
 * @param {Object} ctx 
 */
function getLoginInfo(ctx) {
    let data = { isLogin: false }
    console.log(ctx.session.userInfo)
    const userInfo = ctx.session.userInfo
    if (userInfo) {
        data = {
            isLogin: true,
            userName: userInfo.userName
        }
    }
    return data
}

router.get('/login', async (ctx, next) => {
    await ctx.render('login', getLoginInfo(ctx))
})

router.get('/register',async (ctx, next) => {
    await ctx.render('register')
})

router.get('/setting',loginRedirect, async (ctx, next) => {
    await ctx.render('setting',ctx.session.userInfo)
})

module.exports = router