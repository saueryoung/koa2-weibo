/**
 * @description 微博缓存层
 * @author 杨硕
 */

const { get, set } = require('./_redis')
const { getBlogListByUser } = require('../services/blog')

// redis key 前缀
const KEY_PREFIX = 'weibo:square:'

/**
 * 获取广场列表的缓存
 * @param {number} pageIndex pageIndex
 * @param {number} pageSize pageSize
 */
async function getSquareCacheList(pageIndex, pageSize) {
    const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`

    // 尝试获取缓存
    const cacheResult = await get(key)
    if (cacheResult != null) {
        return cacheResult
    }
    
    // 没有缓存，则读取数据库
    const res = await getBlogListByUser({ pageIndex, pageSize })
    // 过期时间一分钟
    set(key, res, 60)

    return res
}

module.exports = {
    getSquareCacheList
}
