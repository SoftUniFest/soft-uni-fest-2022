import express from 'express';
import cors from 'cors';
import expresConfiguration from './config/expressConfig.js';
import databaseConfig from './config/databaseConfig.js';
import router from './config/globalRouter.js';
import { firebaseConfig } from './config/firebaseConfig.js';
import config from './config/config.js';

startApp();

async function startApp() {
    const server = express();
    server.use(cors());
    await databaseConfig(server);
    firebaseConfig(server);
    expresConfiguration(server);
    router(server);

    server.listen(config.APP_PORT, () => console.log(`Server listening on port ${config.APP_PORT}`));
}
