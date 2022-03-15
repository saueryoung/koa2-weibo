const path = require('path')
const koaStatic = require('koa-static')
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

// router
const errorViewRouter = require('./routes/view/error')
const userViewRouter = require('./routes/view/user')
const blogViewRouter = require('./routes/view/blog')
const userAPIRouter = require('./routes/api/user')
const utilsAPIRouter = require('./routes/api/utils')
const profileAPIRouter = require('./routes/api/blog-profile')
const bolgHomeAPIRouter = require('./routes/api/blog-home')
const squareAPIRouter = require('./routes/api/blog-square')
const blogAtAPIRouter =  require('./routes/api/blog-at')
// session&&redis
const session = require('koa-generic-session')
const redisStore = require('koa-redis')

const {REDIS_CONF} = require('./conf/db')
const { isProd } = require('./utils/env')
const { CRYPTO_SECRET_KEY } = require('./conf/secretKeys')

// error handler
// 生产环境出错跳转到error界面
let onerrorConf = {}
if (isProd) {
    onerrorConf = {
        redirect: '/error'
    }
}
onerror(app,onerrorConf)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname,'..','uploadFile')))

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 对userid加密
app.keys = [CRYPTO_SECRET_KEY]
app.use(session({
    key: 'weibo.sid', //cookie的名字
    prefix: 'weibo:sess:', //redis的key的名字
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    },
    store: redisStore({
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
}))

// routes
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())
app.use(utilsAPIRouter.routes(), utilsAPIRouter.allowedMethods())
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(bolgHomeAPIRouter.routes(), bolgHomeAPIRouter.allowedMethods())
app.use(profileAPIRouter.routes(), profileAPIRouter.allowedMethods())
app.use(squareAPIRouter.routes(), squareAPIRouter.allowedMethods())
app.use(blogAtAPIRouter.routes(), blogAtAPIRouter.allowedMethods())
// 兜底的放在最下面!
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
