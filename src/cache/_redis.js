/**
 * @description 环境变量配置
 * @author 杨硕
 */

const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')
console.log(REDIS_CONF.port, REDIS_CONF.host)
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

redisClient.on('error', err => {
    console.log('error:', err)
})

/**
 * redis set 
 * @param {string} key key
 * @param {string} val val
 * @param {number} timeout 过期时间
 */
function set(key, val, timeout = 60 * 60) {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val)
    redisClient.expire(key, timeout)
}

/**
 * redis get
 * @param {string} key key
 */
function get(key) {
    const p = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }
            if (val === null) {
                resolve(null)
                return
            }
            try {
                resolve(JSON.parse(val))
            } catch (err) {
                reject(err)
            }
        })
    })
    return p
}

module.exports = {
    set,
    get
}