import { auth } from '../config/firebaseConfig';
import { toast } from 'react-toastify';

import * as globalConstanst from '../globalConstants/globalConstants';

export const request = async (url, options) => {
    try {
        if (!url || !options?.method) {
            throw new Error(globalConstanst.invalidInputParamsMessage);
        }
        const response = await fetch(url, options);
        if (!response.ok) {
            const message = await response.json();
            throw new Error(message.message);
        }
        const data = await response.json();
        return data;
    } catch (err) {
        toast.error(err.message);
        return err.message;
    }
};

export const getOptions = async (method = 'get', body) => {
    const idToken = await getUserToken();

    const options = {
        method,
        headers: {},
    };

    if (idToken) {
        options.headers['X-Authorization'] = idToken;
    }

    if (body) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    return options;
};

export const getUserToken = () => {
    const currentUser = auth.currentUser;

    if (!currentUser) return null;

    return currentUser.getIdToken(true);
};
