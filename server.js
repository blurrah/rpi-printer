import Koa from 'koa';
import views from 'koa-views';
import serve from 'koa-static';
import Router from 'koa-router';
import convert from 'koa-convert';
import bodyParser from 'koa-body';
import indexRoutes from './routes/index';
import statusRoutes from './routes/status';
import printRoutes from './routes/print';

const app = new Koa();
const router = new Router()

router.use(convert(bodyParser({
    multipart: true
})));

const getRouter = (path) => require('./routes/' + path).default;

router.use('/status*', statusRoutes.routes());
router.use('/upload*', printRoutes.routes());
router.use('/*', indexRoutes.routes());

app.use(router.routes());

app.listen(3000, () => {
   console.log("Server running on port 3000");
});

export default app;