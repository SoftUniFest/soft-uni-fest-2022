import React, { useContext, useState, useEffect } from 'react';
import { auth, authService } from '../config/firebaseConfig';
import userService from './../services/userService';
import apiRoutes from './../api/apiRoutes';

const AuthCtx = React.createContext();

export const useAuth = () => {
    return useContext(AuthCtx);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const [userRole, setUserRole] = useState('');
    const [isRegistrationCompleted, setIsRegistrationCompleted] = useState(false);

    useEffect(() => {
        const unsubscribe = authService.onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);

            if (user) {
                user.getIdTokenResult(true)
                    .then((idTokenResult) => {
                        setUserRole(idTokenResult.claims['role']);
                    })
                    .catch((err) => console.log(err.message))
                    .finally(() => setIsAuthLoading(false));
            } else {
                setIsAuthLoading(false);
            }
        });

        return unsubscribe;
    }, []);

    const logout = async () => {
        localStorage.removeItem('userData');
        setUserRole('');
        return await authService.signOut(auth);
    };

    const signup = async (email, password, fullName) => {
        const createdUser = await authService.createUserWithEmailAndPassword(auth, email, password); // const createdUser =
        const userDetails = await userService.addUserRegisterDetails({ email, fullName });

        if (typeof userDetails === 'string') {
            await authService.deleteUser(auth.currentUser);

            return userDetails;
        }

        setIsRegistrationCompleted(true);

        createdUser.user.getIdToken(true).then(() => {
            createdUser.user
                .getIdTokenResult(true)
                .then((idTokenResult) => {
                    setUserRole(idTokenResult.claims['role']);
                })
                .catch((err) => console.log(err.message));
        });

        return userDetails;
    };

    const login = async (email, password, isCheckedRememberMe) => {
        await authService.setPersistence(
            auth,
            isCheckedRememberMe === 'true'
                ? authService.browserLocalPersistence
                : authService.browserSessionPersistence
        );
        await authService.signInWithEmailAndPassword(auth, email, password); // const createdUser =
        const userDetails = await userService.addUserLoginDetails(email);
        setIsRegistrationCompleted(true);

        return userDetails;
    };

    const getNewPassword = (email) => {
        return authService.sendPasswordResetEmail(auth, email);
    };

    const changeEmail = (newEmail) => {
        return currentUser.updateEmail(auth, newEmail);
    };

    const changePassword = (newPassword) => {
        return currentUser.updatePassword(auth, newPassword);
    };

    const verifyEmail = () => {
        authService.sendEmailVerification(auth.currentUser);
    };

    const sendPasswordResetEmail = (employeeEmail) => {
        const actionCodeSettings = {
            url: apiRoutes.userRessetPasswordURL(),
            handleCodeInApp: true,
        };

        return authService.sendPasswordResetEmail(auth, employeeEmail, actionCodeSettings);
    };

    const verifyEmailAction = async (actionCode) => {
        try {
            await authService.applyActionCode(auth, actionCode);
        } catch (err) {
            throw err;
        }
    };

    const resetPasswordAction = async (newPassword, actionCode) => {
        let email = undefined;
        try {
            email = await authService.verifyPasswordResetCode(auth, actionCode);
        } catch (err) {
            throw new Error('Session expired!');
        }

        try {
            await authService.confirmPasswordReset(auth, actionCode, newPassword);
        } catch (err) {
            throw new Error('Password must be at least 6 characters long!');
        }
        return await login(email, newPassword, false);
    };

    const value = {
        currentUser,
        isRegistrationCompleted,
        setIsRegistrationCompleted,
        login,
        signup,
        logout,
        getNewPassword,
        changeEmail,
        changePassword,
        resetPasswordAction,
        verifyEmailAction,
        userRole,
        verifyEmail,
        sendPasswordResetEmail,
        isAuthLoading,
    };

    return <AuthCtx.Provider value={value}>{!isAuthLoading && children}</AuthCtx.Provider>;
};
