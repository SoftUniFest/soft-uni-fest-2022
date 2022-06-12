import express from 'express';

const router = express.Router();

router.get('/example', async (req, res, next) => {
    return res.send('Everything is working');
});

export default router;
