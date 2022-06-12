import admin from '../config/firebaseConfig.js';
import userService from '../services/userService.js';

export default () => (req, res, next) => {
    const token = req.headers['x-authorization'];
    let uid = '';

    if (!token) return next()

    admin
        .auth()
        .verifyIdToken(token)
        .then(async (decodedToken) => {
            const userEmail = decodedToken.email;
            uid = decodedToken.uid;

            const userFromDB = await userService.getUserByEmail(userEmail);

            req.user = {
                _id: userFromDB._id,
                email: userFromDB.email,
                firebaseId: userFromDB.firebaseId,
                fullName: userFromDB.fullName,
                image: userFromDB.image,
                companyId: userFromDB.companyId,
                position: userFromDB.position,
                companyName: userFromDB.companyName,
                uid: decodedToken.uid
            };

        })
        .catch((err) => {
            req.user = { uid };
        }).finally(() => next());
};