import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updateEmail,
    updatePassword,
    sendSignInLinkToEmail,
    sendEmailVerification,
    verifyPasswordResetCode,
    applyActionCode,
    confirmPasswordReset,
    deleteUser,
    setPersistence,
    browserSessionPersistence,
    browserLocalPersistence,
} from 'firebase/auth';

const app = initializeApp({
    apiKey: 'AIzaSyDpP-zj6GFqxQZyN1p0UJ9_t5vrThZ0fMQ',
    authDomain: 'softunifest.firebaseapp.com',
    projectId: 'softunifest',
    storageBucket: 'softunifest.appspot.com',
    messagingSenderId: '19387161301',
    appId: '1:19387161301:web:d52b1fb1cddde3e2f0a05c',
    measurementId: 'G-P32T9YZCDF',
});

export const auth = getAuth();

export const authService = {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updateEmail,
    updatePassword,
    sendSignInLinkToEmail,
    sendEmailVerification,
    verifyPasswordResetCode,
    confirmPasswordReset,
    applyActionCode,
    setPersistence,
    deleteUser,
    browserLocalPersistence,
    browserSessionPersistence,
};

export const analytics = getAnalytics(app);

export default app;
