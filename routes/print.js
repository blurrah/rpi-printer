import Router from 'koa-router';
import path from 'path';
import fs from 'fs-extra';
import gfs from '../lib/gridfs';
import Printer from '../printer/';

const router = new Router();

function formatFilename(name, id) {
    const separator = '_';
    return encodeURIComponent(name + (n > 0 ? separator + n : '') + ext);
}

router.post('/', async (ctx, next) => {
    const file = ctx.request.body.files.file;
    const ext = path.extname
    const name = path.basename(file.name, ext);

    let fileExists = false;

    do {
        try {
            fileExists = await gfs.exist({
                filename: formatFilename(name, id),
                root: 'documents'
            });
        } catch (err) {
            console.log(`GFS Error: ${err}`);
            return;
        }


        if (fileExists) {
            id++;
        } else {
            break;
        }
    } while (true);

    const writestream = gfs.createWriteStream({
        filename: formatFilename(name, id),
        root: 'documents',
        content_type: file.type
    });

    const content = fs.createReadStream(file.path);
    content.pipe(writestream);

    try {
        await new Promise(resolve => writestream.on('close', () => resolve()));
    } catch (err) {
        console.log(`FS error: ${err}`);
    }

    ctx.body = {
        contentType: file.type,
        uploadDate: new Date().toJSON()
    }

    await next();

    fs.unlink(file.path, function (err) {
        if (err) console.log(`Unlink error: ${err}`)
    });
});

export default router;