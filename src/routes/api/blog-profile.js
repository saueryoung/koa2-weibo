/**
 * @description blog-profile API
 * @author 杨硕
 */

const { create } = require('../../controller/blog-home')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { loginCheck } = require('../../middlewares/loginCheck')
const { genValidator } = require('../../middlewares/validator')
const blogValidate = require('../../validator/blog')

const router = require('koa-router')()
router.prefix('/api/profile')

// router.post('/loadMore/:userName/:pageIndex', async (ctx, next) => {
//     const { userName, pageIndex } = ctx.params
//     const res = await getProfileBlogList(userName, pageIndex)
//     // res.data.blogListTpl = 
// })

module.exports = router