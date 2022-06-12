import express from 'express';
import cors from 'cors';
import auth from '../middlewares/authMiddleware.js';
import preloadUserData from '../middlewares/preloadUserData.js';

export default (server) => {
    server.use(express.json());
    server.use(cors());
    server.use(preloadUserData());
    server.use(auth());
};
