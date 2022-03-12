/**
 * @description 数据模型入口文件
 * @author 杨硕
 */

const User = require('./User')
const Blog = require('./Blog')

// Bolg -> User是一对多的关系
Blog.belongsTo(User, {
    // usrId（Blog里的） => id（User里的）
    foreignKey: 'userId'
})

module.exports = {
    User,
    Blog
}