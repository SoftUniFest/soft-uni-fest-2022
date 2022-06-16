import React from 'react';
import styled from 'styled-components';

const Input = ({ name, error, type, placeholder, value, onChange }) => {
    return (
        <Label>
            <Error data-testid="errorLabel">{error ? error : ''}</Error>
            <InputField
                data-testid="inputTest"
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                autoComplete="on"
            />
        </Label>
    );
};

const Label = styled.label`
    font-size: 1.5rem;
    width: 100%;
    display: block;
    height: 10rem;
    text-align: center;
`;

const Error = styled.p`
    color: #fb294c;
    margin: 0;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const InputField = styled.input`
    box-sizing: border-box;
    height: 6rem;
    border: 2px solid #296cfb;
    color: #296cfb;
    opacity: 1;
    padding-left: 4.5rem;
    font-size: 2.2rem;
    width: 100%;
`;

export default Input;
