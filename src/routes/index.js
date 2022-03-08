const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/:username/:pageIndex', async (ctx, next) => {
  const { username, pageIndex } = ctx.params
  ctx.body = {
    name: username,
    index: pageIndex,
  }
})


router.get('/json', async (ctx, next) => {
  // const session = ctx.session
  // if (session.viewNumber == null) {
  //   session.viewNumber = 0
  // }
  // session.viewNumber++
  ctx.body = {
    title: 'koa2 json',
    // a: session.viewNumber
  }
})

module.exports = router
