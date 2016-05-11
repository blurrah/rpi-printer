import Koa from 'koa';
import views from 'koa-views';
import serve from 'koa-static';
import Router from 'koa-router';
import convert from 'koa-convert';
import bodyParser from 'koa-body';

// Import routes
import indexRouter from './routes/index';
import statusRouter from './routes/status';
import printRouter from './routes/print';
import documentRouter from './routes/document';

const app = new Koa();
const router = new Router()

router.use(convert(bodyParser({
    multipart: true
})));

router.use('/printers*', statusRouter.routes());
router.use('/upload*', printRouter.routes());
router.use('/document*', documentRouter.routes());
router.use('/*', indexRouter.routes());

app.use(router.routes());

app.listen(3000, () => {
   console.log("Server running on port 3000");
});

export default app;