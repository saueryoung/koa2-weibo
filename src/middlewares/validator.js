/**
 * @description post信息验证
 * @author 杨硕
 */

const { jsonSchemaFileInfo } = require('../model/ErrorInfo')
const { ErrorModel } = require('../model/ResModel')

/**
 * 根据验证函数生成验证中间件
 * @param {Function} validateFn
 */
function genValidator(validateFn) {
    const validator = async (ctx, next) => {
        const data = ctx.request.body
        const err = validateFn(data)
        if (err) {
            ctx.body = new ErrorModel(jsonSchemaFileInfo)
            return
        }
        await next()
    }
    return validator
}

module.exports = {
    genValidator
}