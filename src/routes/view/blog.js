/**
 * @description blog
 * @author 杨硕
 */

const { getProfileBlogList } = require('../../controller/blog-profile')
const { loginRedirect } = require('../../middlewares/loginCheck')
const {isExist} = require('../../controller/user')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getFans, getFollowers } = require('../../controller/user-relation')
const { getHomeBlogList } = require('../../controller/blog-home')

const router = require('koa-router')()

// 首页
router.get('/', loginRedirect, async (ctx, next) => {
    const userInfo = ctx.session.userInfo
    const { id: userId } = userInfo

    // 获取第一页数据
    const result = await getHomeBlogList(userId)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

    // 获取粉丝
    const fansResult = await getFans(userId)
    const { count: fansCount, userList: fansList } = fansResult.data

    // 获取关注人列表
    const followersResult = await getFollowers(userId)
    const { count: followersCount, userList: followersList } = followersResult.data

    await ctx.render('index', {
        userData: {
            userInfo,
            fansData: {
                count: fansCount,
                list: fansList
            },
            followersData: {
                count: followersCount,
                list: followersList
            },
        },
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
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
    const isMe = myUserName === curUserName
    if (isMe) {
        // 是当前登录用户
        curUserInfo = myUserInfo
    } else {
        // 不是当前登录用户，可以查看别人的空间
        const existResult = await isExist(curUserName)
        if (existResult.errno !== 0) {
            return
        }
        curUserInfo = existResult.data
    }
    // 获取第一页数据
    const res = await getProfileBlogList(curUserName, 0)
    const { isEmpty, blogList, count, pageSize, pageIndex } = res.data

    const fansResult = await getFans(curUserInfo.id)
    const { count: fansCount, userList: fansList } = fansResult.data

    const followersResult = await getFollowers(curUserInfo.id)
    const { count: followersCount, userList: followersList } = followersResult.data
    // 是否关注了这个人
    const amIFollowed = fansList.some(item => item.userName === myUserName)

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
            isMe,
            fansData: {
                count: fansCount,
                list: fansList,
            },
            followersData: {
                count: followersCount,
                list: followersList
            },
            amIFollowed
        },
    })
})

// 广场
router.get('/square', loginRedirect, async (ctx, next) => {
    // 获取微博数据，第一页
    const res = await getSquareBlogList(0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = res.data || {}

    await ctx.render('square', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
})


module.exports = router
