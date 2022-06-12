import userService from '../services/userService.js';
import * as middlewareConstants from '../globalConstants/middlewaresConstants.js';
import { errorBuilder, logError } from '../utils/errorBuilder.js';

export default () => (req, res, next) => {
    req.auth = {
        async register(userData) {
            try {
                const user = await register(userData);
                return user;
            } catch (err) {
                next(errorBuilder(err).badRequest(middlewareConstants.registratingFailedMessage));
            }
        },
        async login(email) {
            try {
                const user = await login(email);
                res.status(200).json(user);
            } catch (err) {
                next(errorBuilder(err).badRequest(middlewareConstants.loginFailedMessaged));
            }
        },
    };

    next();
};

const register = async (userData) => {
    const user = await userService.getUserByEmail(userData.email);

    if (user) {
        throw new Error(middlewareConstants.userExistsMessage);
    }

    return userService.createUser(userData);
};

const login = async (email) => {
    const user = await userService.getUserByEmail(email);

    if (!user) {
        throw new Error(middlewareConstants.wrongUsernameOrPasswordMesssage);
    }

    return user;
};
