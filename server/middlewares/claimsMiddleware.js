import admin from '../config/firebaseConfig.js';
import * as middlewareConstants from '../globalConstants/middlewaresConstants.js';
import { errorBuilder } from '../utils/errorBuilder.js';

export const addOwnerRole = () => {
    return (req, res, next) => {
        console.log(req.user);
        admin
            .auth()
            .setCustomUserClaims(req.user.uid, { role: 'owner' })
            .then(() => {
                console.log('claim added');
                next();
            })
            .catch((err) => {
                next(errorBuilder(err).badRequest(middlewareConstants.addingOwnerRoleFailedMessage));
            });
    };
};

export const addEmployeeRole = () => {
    return (req, res, next) => {
        admin
            .auth()
            .setCustomUserClaims(req.user.uid, { role: 'employee' })
            .then(() => {
                console.log('claim added');
                next();
            })
            .catch((err) => {
                next(errorBuilder(err).badRequest(middlewareConstants.addingEmployeeFailedMessage));
            });
    };
};
