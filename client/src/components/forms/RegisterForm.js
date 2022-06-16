import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAuth } from '../../contexts/AuthCtx';
import { useUser } from '../../contexts/UserCtx';
import * as globalConstants from '../../globalConstants/globalConstants';

import Input from '../common/Input';

import { FaEyeSlash, FaEye } from 'react-icons/fa';

const RegisterForm = () => {
    const { signup, verifyEmail } = useAuth();
    const { updateUserContext } = useUser();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [errName, setErrName] = useState(null);
    const [errEmail, setErrEmail] = useState(null);
    const [errPassword, setErrPassword] = useState(null);
    const [errRePassword, setErrRePassword] = useState(null);
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [isRepeatPasswordHidden, setIsRepeatPasswordHidden] = useState(true);

    const isInvalid = () => {
        setErrEmail(null);
        setErrName(null);
        setErrPassword(null);
        setErrRePassword(null);

        let result = false;
        if (name === '' || name.length < globalConstants.nameMinLength) {
            setErrName(globalConstants.nameRequiremetnsMessage);
            result = true;
        }
        if (email === '' || !email.match(globalConstants.emailRegularExpression)) {
            setErrEmail(globalConstants.emailRequirementsMessage);
            result = true;
        }
        if (password === '' || password.length < globalConstants.passwordMinLength) {
            setErrPassword(globalConstants.passwordRequirementsMessage);
            result = true;
        }
        if (rePassword !== password) {
            setErrRePassword(globalConstants.repeatPasswordRequirementsMessage);
            result = true;
        }
        return result;
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        if (isInvalid()) return;

        let requestError = false;
        try {
            setIsLoading(true);
            const userDetails = await signup(email, password, name);

            if (typeof userDetails === 'string') {
                requestError = true;
                throw new Error(userDetails);
            }

            await verifyEmail(); // Uncomment in porduction or for testing purposes
            toast.success(globalConstants.successfullyLoginMessage);
            toast.success(globalConstants.emailVerificationRemainderMessage);

            localStorage.setItem('userData', JSON.stringify(userDetails));
            updateUserContext(userDetails);
            setIsLoading(false);
            navigate('/after-register');
        } catch (err) {
            if (!requestError) toast.error(err.message);
            setIsLoading(false);
            setErrName(err.message);
        }
    };

    const togglePasswordVisabilityHandler = (e) => {
        e.preventDefault();

        const form = e.target.closest('form');

        if (form.password.type === 'text') {
            form.password.type = 'password';
            setIsPasswordHidden(true);
        } else {
            form.password.type = 'text';
            setIsPasswordHidden(false);
        }
    };

    const toggleRepeatPasswordVisabilityHandler = (e) => {
        e.preventDefault();

        const form = e.target.closest('form');

        if (form.repeatPassword.type === 'text') {
            form.repeatPassword.type = 'password';
            setIsRepeatPasswordHidden(true);
        } else {
            form.repeatPassword.type = 'text';
            setIsRepeatPasswordHidden(false);
        }
    };
    return (
        <Form onSubmit={onSubmit}>
            <Input
                name="fullName"
                type="text"
                error={errName}
                placeholder="Full Name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Input
                name="email"
                type="email"
                error={errEmail}
                placeholder="Email Address *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <Input
                name="password"
                type="password"
                error={errPassword}
                placeholder="Password *"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <PasswordIcon onClick={togglePasswordVisabilityHandler}>
                {isPasswordHidden ? <FaEye size={24} /> : <FaEyeSlash size={24} />}
            </PasswordIcon>
            <Input
                name="repeatPassword"
                type="password"
                error={errRePassword}
                placeholder="Password *"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
            />

            <RepeatPasswordIcon onClick={toggleRepeatPasswordVisabilityHandler}>
                {isRepeatPasswordHidden ? <FaEye size={24} /> : <FaEyeSlash size={24} />}
            </RepeatPasswordIcon>

            <SignUpButton disabled={isLoading} type="submit">
                {' '}
                SignUp{' '}
            </SignUpButton>
        </Form>
    );
};

const Form = styled.form`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #296cfb;
    width: 45rem;
`;

const PasswordIcon = styled.div`
    position: absolute;
    top: 25rem;
    left: 40rem;
    cursor: pointer;
`;

const RepeatPasswordIcon = styled.div`
    position: absolute;
    top: 35rem;
    left: 40rem;
    cursor: pointer;
`;

const SignUpButton = styled.button`
    margin-top: 4rem;
    box-sizing: border-box;
    font-size: 2.2rem;
    border: none;
    width: 45%;
    height: 7rem;
    font-weight: bold;
    cursor: pointer;
    background-color: #296cfb;
    color: #ffffff;
`;

export default RegisterForm;
