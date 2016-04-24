import Router from 'koa-router';

const printers = [
    { id: 0, name: "Primary Printer", status: "Good", paper: "2000", colors: { c: 100, m: 80, y: 74, k: 10}}
];

const router = new Router();

router.get('/', ctx => {
  ctx.body = "Healthy like a horse";
});

export default router;