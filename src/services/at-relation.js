/**
 * @description 微博 @ 用户关系 service
 * @author 杨硕
 */

const { AtRelation} = require('../db/model/index')
 
/**
  * 创建微博 @ 用户的关系
  * @param {number} blogId 
  * @param {number} userId 
  */
async function createAtRelation(blogId, userId) {
    const result = await AtRelation.create({
        blogId,
        userId
    })
    return result.dataValues
}

module.exports = {
    createAtRelation
}