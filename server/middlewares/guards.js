import admin from '../config/firebaseConfig.js';
import { errorBuilder } from '../utils/errorBuilder.js';

export const isAuth = () => {
    return (req, res, next) => {
        if (req.headers['x-authorization']) {
            const token = req.headers['x-authorization'];
            admin
                .auth()
                .verifyIdToken(token)
                .then((decodedToken) => {
                    next();
                })
                .catch((err) => {
                    next(errorBuilder(err).unauthorized(err.message));
                });
        } else {
            next(errorBuilder({ message: 'Unauthorized' }).unauthorized('Invalid token!'));
        }
    };
};

export const isOwner = () => {
    return (req, res, next) => {
        admin
            .auth()
            .getUser(req.user.uid)
            .then((userRecord) => {
                if (userRecord.customClaims['role'] == 'owner') {
                    next();
                } else {
                    next(errorBuilder({ message: 'Unauthorized' }).unauthorized('Invalid user role!'));
                }
            })
            .catch((err) => {
                next(errorBuilder(err).unauthorized(err.message));
            });
    };
};

export const isAdmin = () => {
    return (req, res, next) => {
        admin
            .auth()
            .getUser(req.user.uid)
            .then((userRecord) => {
                if (userRecord.customClaims['role'] == 'admin') {
                    next();
                } else {
                    next(errorBuilder({ message: 'Unauthorized' }).unauthorized('Invalid user role!'));
                }
            })
            .catch((err) => {
                next(errorBuilder(err).unauthorized(err.message));
            });
    };
};
