import exampleController from '../controllers/exampleController.js';
import authController from '../controllers/authController.js';
import { errorHandler } from '../middlewares/errorMiddleware.js';

export default (server) => {
    // example use
    server.use('/', exampleController);
    server.use('/auth', authController);
    server.use(errorHandler);
};
