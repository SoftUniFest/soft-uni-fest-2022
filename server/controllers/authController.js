import express from 'express';
import admin from '../config/firebaseConfig.js';

import { isAuth } from '../middlewares/guards.js';
import { addOwnerRole } from '../middlewares/claimsMiddleware.js';
import { errorBuilder } from '../utils/errorBuilder.js';
import * as controllersConstants from '../globalConstants/controllersConstants.js';

const router = express.Router();

router.post('/register', isAuth(), addOwnerRole(), async (req, res, next) => {
    const email = req.body.email;
    const fullName = req.body.fullName;

    if (!fullName) {
        next(
            errorBuilder(new Error(controllersConstants.fullNameRequiredMessage)).internalServerError(
                controllersConstants.fullNameRequiredMessage
            )
        );
        return;
    }

    try {
        await req.auth.register({ email, fullName });
        res.status(201).json(updatedOwner);
    } catch (err) {
        next(errorBuilder(err).badRequest(controllersConstants.unSuccessfullyCreatedCompanyMessage));
    }
});

// To be deleted before deployment!!!!
router.post('/register/admin', async (req, res, next) => {
    const email = req.body.email;
    const fullName = req.body.fullName;

    try {
        await req.auth.register({ email, fullName });
        res.status(201).json(updatedAdmin);
    } catch (err) {
        console.log(err.message);
        next(errorBuilder(err).badRequest(controllersConstants.unSuccessfullyCreatedAdminMessage));
    }
});

router.post('/login', isAuth(), async (req, res, next) => {
    try {
        const email = req.body.email;
        req.auth.login(email);
    } catch (err) {
        console.log(err.message);
        next(errorBuilder(err).unauthorized(controllersConstants.invalidUsernameOrPasswordMessage));
    }
});

export default router;
