const Koa = require('koa');

const app = new Koa();

const koaBody = require('koa-body');

const router = require('../src/routes/index');

app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(5000, () => {
  console.log('ok');
});
