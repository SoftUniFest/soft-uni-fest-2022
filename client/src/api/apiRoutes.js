const baseUrl = 'http://localhost:5000';
const appBaseUrl = 'http://localhost:3000';

const printError = (err) => {
    throw new Error(err || 'Invalid ID in apiRoutes');
};

// just as an example how to use the file DELETE WHEN CREATING NEW
const userRoutes = {
    userRessetPasswordURL: () => `${appBaseUrl}/login`,
    userRegisterURL: () => `${baseUrl}/auth/register`,
    userLoginURL: () => `${baseUrl}/auth/login`,
    userByIdURL: (userId) => {
        return userId ? `${baseUrl}/user/${userId}` : printError();
    },
};

const routes = {
    ...userRoutes,
};

export default routes;
