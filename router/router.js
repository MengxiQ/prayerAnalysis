const route = require('koa-route');

const main = require('../controller/main')

const useRouter = (app) => {
    app.use(route.post('/home', main));
}

module.exports = useRouter


