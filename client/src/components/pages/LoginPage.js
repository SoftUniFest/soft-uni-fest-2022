import { Link } from 'react-router-dom';
import styled from 'styled-components';

import LoginForm from '../forms/LoginForm';

const LoginPage = () => {
    return (
        <Wrapper>
            <Title> Welcome back!</Title>
            <p style={{ fontSize: '2rem' }}>Please login to your account.</p>
            <LoginForm />
            <RegisterLinkWrapper>
                <RegisterLink>
                    Don't have an account?
                    <Link to="/register"> Register here.</Link>
                </RegisterLink>
            </RegisterLinkWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Title = styled.h1`
    font-size: 5rem;
`;

const RegisterLinkWrapper = styled.div`
    margin: 2rem 0;
    letter-spacing: 0px;
    color: #296cfb;
    opacity: 1;
    font-size: 2.2rem;
`;

const RegisterLink = styled.p`
    text-decoration: underline;
    font-weight: bold;
    letter-spacing: 0px;
    opacity: 1;
    margin: 0 2rem;
`;

export default LoginPage;
