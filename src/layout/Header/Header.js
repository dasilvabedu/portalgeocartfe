/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable semi */
import React from 'react';
import { NavLink } from 'react-router-dom';

import styled from 'styled-components';
import logo from './logo.png';

const Wrapper = styled.header`
    position: relative;
    z-index: 2000;
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 16px;
    background-color: white;
`;

const LogoImage = styled.img`
    display: block;
    max-width: 132px;
    height: auto;
`;

export default function Header() {
    return (
        <Wrapper>
            <NavLink to="/">
                <LogoImage src={logo} />
            </NavLink>
        </Wrapper>
    );
}
