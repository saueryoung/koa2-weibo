/**
 * @description user API route
 * @author 杨硕
 */

const { isExist, register, login, deleteCurUser, changeInfo, changePassword, logout } = require('../../controller/user')
const { getFollowers } = require('../../controller/user-relation')
const { loginCheck } = require('../../middlewares/loginCheck')
const { genValidator } = require('../../middlewares/validator')
const { isTest } = require('../../utils/env')
const userValidate = require('../../validator/user')

const router = require('koa-router')()
router.prefix('/api/user')

// 注册
router.post('/register', genValidator(userValidate), async (ctx, next) => {
    const { userName, password, gender } = ctx.request.body
    ctx.body = await register({userName,password,gender})
})

// 是否有用户信息
router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    ctx.body = await isExist(userName)
})

// 登录
router.post('/login', async (ctx, next) => {
    const { userName,password } = ctx.request.body
    ctx.body = await login(ctx,userName,password)
})

// 删除用户信息
router.post('/delete',loginCheck, async (ctx, next) => {
    if (isTest) {
        const {userName} = ctx.session.userInfo
        ctx.body = await deleteCurUser(userName)
    }
})

// 修改用户信息
router.patch('/changeInfo',loginCheck,genValidator(userValidate), async (ctx, next) => {
    const { nickName, city, picture } = ctx.request.body
    ctx.body = await changeInfo(ctx , { nickName, city, picture })
})

// 修改密码
router.patch('/changePassword', loginCheck, genValidator(userValidate), async (ctx, next) => {
    const {userName} = ctx.session.userInfo
    const {password,newPassword} = ctx.request.body
    ctx.body = await changePassword(userName,password,newPassword)
})

// 退出登录
router.post('/logout', async (ctx, next) => {
    ctx.body = await logout(ctx)
})

// 获取 at 列表，即关注人列表
router.get('/getAtList', loginCheck, async (ctx, next) => {
    const { id: userId } = ctx.session.userInfo
    const res = await getFollowers(userId)
    const { userList: followersList } = res.data
    const list = followersList.map(user => {
        return `${user.nickName} - ${user.userName}`
    })
    // 格式如 ['张三 - zhangsan', '李四 - lisi', '昵称 - userName']
    ctx.body = list
})

module.exports = router