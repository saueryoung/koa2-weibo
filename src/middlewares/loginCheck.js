/**
 * @description 登录验证中间件
 * @author 杨硕
 */

const { loginCheckFailInfo } = require('../model/ErrorInfo')
const { ErrorModel } = require('../model/ResModel')

/**
 * API 验证
 * @param {Object} ctx 
 * @param {function} next 
 */
async function loginCheck(ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
        await next()
        return
    }
    ctx.body = new ErrorModel(loginCheckFailInfo)
}

/**
 * 页面登录验证
 * @param {Object} ctx 
 * @param {function} next 
 */
async function loginRedirect(ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
        await next()
        return
    }
    const curUrl = ctx.url
    // 登录过了就直接跳转到原来想要的地址
    ctx.redirect('/login?url=' + encodeURIComponent(curUrl))
}

module.exports = {
    loginCheck,
    loginRedirect
}
