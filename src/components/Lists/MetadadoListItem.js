import React from 'react';
import styled from 'styled-components';

const MetadadoItemContainer = styled.div`
    background: #fff;
    border-radius: 8px;
    margin-top: 8px;
    padding: 16px;
    position: relative;
    box-shadow: 0 4px 8px grey;
`;

const MetadadoItemContainerWithWarning = styled(MetadadoItemContainer)`
    border-bottom: ${(props) =>
        new Date(props.createdAt) > new Date(Date.now() - 8640000 * 5)
            ? 'none'
            : '2px solid red'};
`;

const ButtonsContainer = styled.div`
    position: absolute;
    right: 12px;
    bottom: 12px;
`;

const Button = styled.button`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    display: inline-block;
    background-color: ${(props) => props.color};
    margin-left: ${(props) => props.marginLeft};
`;

const MetadadoListItem = ({ metadado, onUpdatedPressed }) => {
    const Container = metadado.isCompleted
        ? MetadadoItemContainer
        : MetadadoItemContainerWithWarning;
    return (
        <Container createdAt={metadado.createdAt}>
            <h3>{metadado.text}</h3>
            <p>
                Created at:&nbsp;
                {new Date(metadado.createdAt).toLocaleDateString()}
            </p>
            <ButtonsContainer>
                {metadado.isCompleted ? null : (
                    <Button
                        color="#22ee22"
                        marginLeft="0px"
                        onClick={() => onUpdatedPressed(metadado.id)}
                    >
                        Alterar
                    </Button>
                )}
            </ButtonsContainer>
        </Container>
    );
};

export default MetadadoListItem;
