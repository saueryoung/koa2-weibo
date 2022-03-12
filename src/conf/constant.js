/**
 * @description 常量集合
 * @author 杨硕
 */

const DEFAULT_PICTURE = 'https://dwz.cn/rnTnftZs'

module.exports = {
    DEFAULT_PICTURE,
    PAGE_SIZE: 5,
    // 正则表达式，匹配 '@昵称 - userName'
    REG_FOR_AT_WHO: /@(.+?)\s-\s(\w+?)\b/g
}