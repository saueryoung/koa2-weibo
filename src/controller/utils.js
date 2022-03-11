/**
 * @description utils controller
 * @author 杨硕
 */
const path = require('path')
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')
const fse = require('fs-extra')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const DIST_FOLDER_PATH = path.join(__dirname,'..','..','uploadFile')
const MAX_SIZE = 1024 * 1024 * 1024

// 没有目录就创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
    if (!exist) {
        fse.ensureDir(DIST_FOLDER_PATH)
    }
})

/**
 * 保存前端传来的文件到本地
 * @param {string} name 
 * @param {string} size 
 * @param {number} type 
 * @param {string} filePath 
 */
async function saveFile({name,size,type,filePath}) {
    if (size > MAX_SIZE) {
        await fse.remove(filePath)
        return new ErrorModel(uploadFileSizeFailInfo)
    }
    // 防止名字重复
    const fileName = Date.now() + '.' + name
    await fse.move(filePath, path.join(DIST_FOLDER_PATH, fileName))
    return new SuccessModel({
        url: '/' + fileName
    })
}

module.exports = {
    saveFile
}