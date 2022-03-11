/**
 * @description 微博数据模型单元测试
 * @author 杨硕
 */

const { Blog } = require("../../src/db/model")

test('微博数据模型属性，符合预期', () => {
    const blog = Blog.build({
        userId: 1,
        content: 'content',
        image: '/2.png'
    })
    expect(blog.userId).toBe(1)
    expect(blog.content).toBe('content')
    expect(blog.image).toBe('/2.png')
})