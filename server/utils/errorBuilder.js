import { logger } from './logger.js';

import * as globalConstants from '../globalConstants/globalConstants.js';

export const errorBuilder = (error, type = 'server') => {
    const errorBody = {
        time: new Date(),
        message: error.message,
        type,
        error,
    };

    const badRequest = (errorMsg = globalConstants.badRequest) => {
        const err = { status: 400, errorMsg, ...errorBody };
        // logError(err);
        return err;
    };

    const unauthorized = (errorMsg = globalConstants.unauthorized) => {
        const err = { status: 401, errorMsg, ...errorBody };
        // logError(err);
        return err;
    };

    const notFound = (errorMsg = globalConstants.notFound) => {
        const err = { status: 404, errorMsg, ...errorBody };
        // logError(err);
        return err;
    };

    const internalServerError = (errorMsg = globalConstants.internalServerError) => {
        const err = { status: 500, errorMsg, ...errorBody };
        // logError(err);
        return err;
    };

    return {
        badRequest,
        unauthorized,
        notFound,
        internalServerError,
    };
};

export const logError = (err) => {
    logger.log({ ...err, level: 'error' });
    console.error(err);
};
