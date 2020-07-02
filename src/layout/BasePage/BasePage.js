/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable semi */
import React from 'react';
import styled from 'styled-components';

import Header from '../Header';
import Footer from '../Footer';

const HEADER_HEIGHT = 50;
const FOOTER_HEIGHT = 30;

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const ContentWrapper = styled.div`
    position: relative;
    flex: 1;
`;

function BasePage({ children }) {
    const contentMinHeight =
        window.innerHeight - (HEADER_HEIGHT + FOOTER_HEIGHT);

    return (
        <PageWrapper>
            <Header />
            <ContentWrapper style={{ minHeight: contentMinHeight }}>
                {children}
            </ContentWrapper>
            <Footer />
        </PageWrapper>
    );
}

export default BasePage;
