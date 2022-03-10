/**
 * @description utils api route
 * @author 杨硕
 */

const { loginCheck } = require('../../middlewares/loginCheck')
const koaForm = require('formidable-upload-koa')
const { saveFile } = require('../../controller/utils')
const router = require('koa-router')()

router.prefix('/api/utils')
router.post('/upload', loginCheck, koaForm(),async (ctx, next) => {
    const file = ctx.req.files['file']
    const { size, name, path, type } = file
    ctx.body = await saveFile({
        size,
        name,
        filePath: path,
        type
    })
    console.log(ctx.body)
})

module.exports = router