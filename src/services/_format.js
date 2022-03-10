/**
 * @description user format
 * @author 杨硕
 */

const {DEFAULT_PICTURE} = require('../conf/constant')
/**
 * 格式化图片
 * @param {String} picture 
 */
function formatUserPicture(picture) {   
    if (picture == null) {
        // 返回默认路径
        return DEFAULT_PICTURE
    }
    return picture
}

/**
 * 格式化用户信息
 * @param {Array/Object} list 用户列表或单个用户对象
 */
function formatUser(list) {
    if (list == null) {
        return list
    }
    if (list instanceof Array) {
        list = list.map(formatUserPicture)
    }
    // 单个对象
    return formatUserPicture(list)
}

module.exports = {
    formatUser
}