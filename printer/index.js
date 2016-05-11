const printer = require('printer');

class PrinterWrapper {
    constructor() {
        console.log(printer.getPrinters);
        this.printers = printer.getPrinters();
    }

    get returnPrinters() {
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

export default new PrinterWrapper();