import mongoose from 'mongoose';
import grid from 'gridfs-stream';

const host = process.env.DB_HOST || 'localhost';
const database = process.env.DB_NAME || 'rpi-printer';

mongoose.connect(`mongodb://${host}/${database}`, {
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD
});

const connection = mongoose.connection;

connection.on('error', info => {
   console.log(`DB ERROR: ${info.message}`);
});

process.on('SIGINT', () => connection.close(() => {
    console.log('Shutting down..');
    process.exit(1);
}));

grid.mongo = mongoose.mongo
const gridConnection = grid(connection.db);

export { connection as rope };
export { mongoose as mongoose };
export { gridConnection as gfs };

