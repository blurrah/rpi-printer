import Router from 'koa-router';
import PrinterWrapper from '../printer/';

// Faked data
const printers = [
    { id: 0, name: "Primary Printer", status: "Good", paper: "2000", colors: { c: 100, m: 80, y: 74, k: 10}},
    { id: 1, name: "Secondary Printer", status: "Good", paper: "2000", colors: { c: 100, m: 80, y: 74, k: 10}}
];

const router = new Router();

router.get('/', ctx => {
    let printerResults = PrinterWrapper.returnPrinters;
    ctx.body = printerResults;
});

/*
router.get('/', ctx => {
  ctx.body = printers;
});
*/


export default router;