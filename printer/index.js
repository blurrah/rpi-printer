import printer from 'node-printer';

export default class PrinterWrapper {
    constructor() {
        this.printers = printer.getPrinters();
    }

    get printers() {
        return this.printers;
    }

    print(filename, settings) {
        return new Promise( (resolve, reject) => {
            printer.printFile({filename: filename, success: (jobId) => {
                resolve(jobId);
            }, error: (err) => {
                console.log(err);
                reject(err);
            }});
        });
    }

    jobStatus(jobId) {
     return printer.getJobs(this.printers[0], jobId);
    }
}