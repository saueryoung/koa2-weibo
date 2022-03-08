/**
 * @description json test
 * @author ys
 */
const server = require('./server.js')
test('json', async () => {
    const res = await server.get('/json')
    expect(res.body).toEqual({
        title: 'koa2 json'
    })
})