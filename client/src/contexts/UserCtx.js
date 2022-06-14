import React, { useContext, useEffect, useState } from 'react';

import { useAuth } from './AuthCtx.js';

const UserCtx = React.createContext();

export const useUser = () => {
    return useContext(UserCtx);
};

export const UserProvider = ({ children }) => {

    const { setIsRegistrationCompleted } = useAuth();

    const [userInfo, setUserInfo] = useState({});
    const [isUserLoading, setIsUserLoading] = useState(true);

    useEffect(() => {
        if (Object.entries(userInfo).length === 0) {
            const userDataFromLocalStorage = localStorage.getItem('userData');

            if (userDataFromLocalStorage) {
                setUserInfo(JSON.parse(userDataFromLocalStorage));
                setIsRegistrationCompleted(true);
                console.log('Page was refreshed. User is set again');
            }
            setIsUserLoading(false);
        }
        else {
            setIsUserLoading(false);
        }
    }, [userInfo, setIsRegistrationCompleted]);

    const updateUserContext = (newUserData) => {
        localStorage.setItem('userData', JSON.stringify(newUserData));
        setUserInfo(newUserData);
    } 

    const clearUserInfo = () => {
        setUserInfo({});
    }

    const value = {
        userInfo,
        updateUserContext,
        isUserLoading,
        clearUserInfo
    };

    return <UserCtx.Provider value={value}>{children}</UserCtx.Provider>;
};
