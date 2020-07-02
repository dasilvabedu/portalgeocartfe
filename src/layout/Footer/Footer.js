/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.footer`
    display: flex;
    align-items: center;
    height: 30px;
    padding: 0 16px;
    background-color: #636466;
    justify-content: center;
`;

const CopyText = styled.small`
    font-size: 12px;
    color: white;
    text-align: center !important;
`;

export default function Footer() {
    return (
        <Wrapper>
            <CopyText>
                © Copyright - China Three Gorges Brasil Energia Ltda. - Todos os
                direitos reservados
            </CopyText>
        </Wrapper>
    );
}
