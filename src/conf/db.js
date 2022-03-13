/**
 * @description 存储配置
 * @author 杨硕
 */

let REDIS_CONF = {
    port: '6379',
    host: '127.0.0.1'
}

let MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'myblog'
}

module.exports = {
    REDIS_CONF,
    MYSQL_CONF
}