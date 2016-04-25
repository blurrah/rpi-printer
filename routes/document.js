import Router from 'koa-router';
import fs from 'fs-extra';
import path from 'path';
import gfs from '../lib/gridfs';

const mimetypes = {
    pdf: 'application/pdf'
};

const router = new Router();

// Google Docs
router.get('/gdocs/:fileId', async (ctx, next) => {
   console.log(`fileId is: ${ctx.params.fileId}`);
   ctx.body = `Request Google Docs file with fileId: ${ctx.params.fileId}`;
});

export default router;