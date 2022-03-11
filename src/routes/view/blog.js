/**
 * @description blog
 * @author 杨硕
 */

const { getProfileBlogList } = require('../../controller/blog-profile')
const { loginRedirect } = require('../../middlewares/loginCheck')

const router = require('koa-router')()

// 主页
router.get('/', loginRedirect, async (ctx, next) => {
    // 一定要有await
    await ctx.render('index', {})
})

// 个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
    const { userName } = ctx.session.userInfo
    ctx.redirect(`/profile/${userName}`)
})

router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
    const myUserInfo = ctx.session.userInfo
    const myUserName = myUserInfo.userName
    let curUserInfo
    const { userName: curUserName } = ctx.params
    console.log(curUserName)
    const isMe = myUserName === curUserName
    if (isMe) {
        // 是当前登录用户
        curUserInfo = myUserInfo
    } else {
        // 不是当前登录用户
        const existResult = await isExist(curUserName)
        if (existResult.errno !== 0) {
            // 用户名不存在
            return
        }
        // 用户名存在
        curUserInfo = existResult.data
    }
    // 获取第一页数据
    const res = await getProfileBlogList(curUserName, 0)
    console.log(res.data)
    const { isEmpty, blogList, count, pageSize, pageIndex } = res.data

    await ctx.render('profile', {
        blogData: {
            isEmpty,
            blogList,
            count,
            pageSize,
            pageIndex
        },
        userData: {
            userInfo: curUserInfo,
            isMe
        }
    })
})

module.exports = router
