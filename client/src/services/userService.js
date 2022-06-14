import * as requester from '../api/crud.js';
import apiRoutes from './../api/apiRoutes';

const addUserRegisterDetails = (userData) => {
    return requester.post(apiRoutes.userRegisterURL(), userData);
};

const addUserLoginDetails = (email) => {
    return requester.post(apiRoutes.userLoginURL(), { email });
};

const updateUserInfo = (userId, userData) => {
    return requester.put(apiRoutes.userByIdURL(userId), userData);
};

const userService = {
    addUserRegisterDetails,
    addUserLoginDetails,
    updateUserInfo,
};

export default userService;
