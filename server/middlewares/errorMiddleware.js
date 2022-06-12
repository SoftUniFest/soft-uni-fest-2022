import { logError } from '../utils/errorBuilder.js';
// import { logger } from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
    const { status, message } = err;
    logError(err);
    res.status(status).json({ message });
};
