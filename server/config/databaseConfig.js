import mongoose from 'mongoose';

import config from './config.js';
import * as globalConstants from '../globalConstants/globalConstants.js';

export default (server) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(config.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const db = mongoose.connection;

        db.on('error', (err) => {
            console.error(globalConstants.unsuccessfulllyConnectedToDatabaseMessage);
            reject(err);
        });

        db.on('open', () => {
            console.log(globalConstants.successfullyConnectedToDatabseMessage);
            resolve();
        });
    });
};
