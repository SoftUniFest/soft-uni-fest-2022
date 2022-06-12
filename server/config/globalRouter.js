import exampleController from '../controllers/exampleController.js';
import { errorHandler } from '../middlewares/errorMiddleware.js';

export default (server) => {
    // example use
    server.use('/', exampleController);
    server.use(errorHandler);
};
