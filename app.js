const Koa = require('koa');
const useRouter = require("./router/router");
const app = new Koa();

useRouter(app)

const port = 3030;
app.listen(port);

console.log('Server run at http://localhost:' + port);
