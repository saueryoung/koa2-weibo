/**
 * @description 常量集合
 * @author 杨硕
 */

const DEFAULT_PICTURE = 'https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%A4%B4%E5%83%8F%E8%93%9D%E8%89%B2icon&step_word=&hs=0&pn=7&spn=0&di=7060663421280190465&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=3976732689%2C2666293373&os=1449350845%2C68306092&simid=4202933742%2C851158078&adpicid=0&lpn=0&ln=1300&fr=&fmq=1647051467479_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%3A%2F%2Fwww.pp-sp.com%2FUploadFiles%2Fimg_0_3976732689_2666293373_26.jpg%26refer%3Dhttp%3A%2F%2Fwww.pp-sp.com%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Dauto%3Fsec%3D1649643483%26t%3Dbd664ae7a6049bab84229a6bf17d1dc9&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Brr-fr_z%26e3Bv54AzdH3FrtvAzdH3F%25Ec%25AF%25Ba%25EE%25bm%25BB%25E9%25BF%25bA%25Em%25BE%25Bm%25Em%25lD%25l8%25Ec%25b9%25lA%25E0%25b8%25bF%25Ec%25ln%25b9%25EE%25b0%25AD%25Em%25BE%25Bm%25Em%25Ba%25AC%25E0%25lA%25AFAzdH3F&gsm=8&rpstart=0&rpnum=0&islist=&querylist=&nojc=undefined&dyTabStr=MCwzLDQsMSw2LDUsNyw4LDIsOQ%3D%3D'

module.exports = {
    DEFAULT_PICTURE,
    PAGE_SIZE: 5,
    // 正则表达式，匹配 '@昵称 - userName'
    REG_FOR_AT_WHO: /@(.+?)\s-\s(\w+?)\b/g
}