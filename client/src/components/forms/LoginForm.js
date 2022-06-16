import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import { useAuth } from '../../contexts/AuthCtx.js';
import { useUser } from '../../contexts/UserCtx.js';
import * as globalConstants from '../../globalConstants/globalConstants';
import Input from '../common/Input';

import { FaEyeSlash, FaEye } from 'react-icons/fa';

const LoginForm = () => {
    const { login } = useAuth();
    const { updateUserContext } = useUser();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckedRememberMe, setIsCheckedRememberMe] = useState(
        localStorage.getItem('isCheckedRememberMe') || 'false'
    );

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);

    useEffect(() => {
        localStorage.setItem('isCheckedRememberMe', isCheckedRememberMe.toString());
        return () => false;
    }, [isCheckedRememberMe]);

    const onLoginSubmit = async (ev) => {
        ev.preventDefault();

        if (email === '' || password === '') {
            return setError(globalConstants.empyFieldsMessage);
        }

        try {
            setError('');
            setIsLoading(true);
            const userDetails = await login(email, password, isCheckedRememberMe);
            toast.success(globalConstants.successfullyLoginMessage);
            setIsLoading(false);
            localStorage.setItem('userData', JSON.stringify(userDetails));
            updateUserContext(userDetails);
            navigate('/after-register');
        } catch (err) {
            console.log(err.message);
            toast.error(globalConstants.unsuccessfullyLoginMessage);
            setIsLoading(false);
            setError(globalConstants.wrongUsernameOrPasswordMessage);
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

    return (
        <>
            {isLoading ? (
                {
                    /* <Spinner /> */
                }
            ) : (
                <Form onSubmit={onLoginSubmit}>
                    <Input
                        name="email"
                        error={error ? error : null}
                        type="email"
                        placeholder="Email Address *"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        name="password"
                        type="password"
                        placeholder="Password *"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <PasswordIcon onClick={togglePasswordVisabilityHandler}>
                        {isPasswordHidden ? <FaEye size={24} /> : <FaEyeSlash size={24} />}
                    </PasswordIcon>

                    <CheckboxWrapper>
                        <ChekboxLabel htmlFor="checkbox">
                            <CheckBoxInput
                                id="checkbox"
                                name="rememberMe"
                                type="checkbox"
                                defaultChecked={isCheckedRememberMe === 'true'}
                                onChange={(e) => setIsCheckedRememberMe(e.target.checked.toString())}
                            />
                            Запомни ме
                        </ChekboxLabel>
                        <Link style={{ fontSize: '1.7rem' }} to="/forgottenPassword">
                            Забравена парола?
                        </Link>
                    </CheckboxWrapper>

                    <SignInButton disabled={isLoading} type="submit">
                        {' '}
                        Sign in{' '}
                    </SignInButton>
                </Form>
            )}
        </>
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
    top: 15rem;
    left: 40rem;
    cursor: pointer;
`;

const CheckboxWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 1rem 0 3rem 0;
`;

const ChekboxLabel = styled.label`
    font-size: 1.7rem;
`;

const CheckBoxInput = styled.input`
    font-size: 1.7rem;
`;

const SignInButton = styled.button`
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

export default LoginForm;
