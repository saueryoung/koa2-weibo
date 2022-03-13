/**
 * @description 数据模型入口文件
 * @author 杨硕
 */

const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRelation')

// Bolg -> User是一对多的关系
Blog.belongsTo(User, {
    // usrId（Blog里的） => id（User里的）
    foreignKey: 'userId'
})

UserRelation.belongsTo(User, {
    foreignKey: 'followerId'
})

User.hasMany(UserRelation, {
    foreignKey: 'userId'
})

Blog.belongsTo(UserRelation, {
    foreignKey: 'userId',
    targetKey: 'followerId'
})

module.exports = {
    User,
    Blog,
    UserRelation
}