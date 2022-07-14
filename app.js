const Koa = require('koa');
const koaBody = require('koa-body');
const useRouter = require("./router/router");
const app = new Koa();
app.use(koaBody());

const path = require('path');
const koaStatic = require('koa-static');
// 静态资源
const main = koaStatic(path.join(__dirname,'./static'));
app.use(main);

// 路由
useRouter(app)

const port = 3030;
app.listen(port);

console.log('Server run at http://localhost:' + port);
