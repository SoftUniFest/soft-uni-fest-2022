import { Link } from 'react-router-dom';
import styled from 'styled-components';

import RegisterForm from '../forms/RegisterForm';

const RegisterPage = () => {
    return (
        <Wrapper>
            <Title>Register</Title>
            <RegisterForm />
            <LoginLinkWrapper>
                <LoginLink>
                    Already have an account?
                    <Link to="/login"> Login here.</Link>
                </LoginLink>
            </LoginLinkWrapper>
        </Wrapper>
    );
};

export default RegisterPage;

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

const LoginLinkWrapper = styled.div`
    margin: 2rem 0;
    letter-spacing: 0px;
    color: #296cfb;
    opacity: 1;
    font-size: 2.2rem;
`;

const LoginLink = styled.p`
    text-decoration: underline;
    font-weight: bold;
    letter-spacing: 0px;
    opacity: 1;
    margin: 0 2rem;
`;
