import admin from '../config/firebaseConfig.js';

export const validateToken = (token) => {
    admin
        .auth()
        .verifyIdToken(token)
        .then((decodedToken) => {
            const userId = decodedToken.user_id;
            req.user = decodedToken;
        })
        .catch(err => {
            console.log(err.message);
            res.status(401).json(err.message);
        })
}