/* eslint-disable no-console */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getMetadados } from '../../selectors/selectors';

const FormContainer = styled.div`
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    box-shadow: 0 4px 8px grey;
`;

const NewMetadadoInput = styled.input`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-bottom: 2px solid #ddd;
    border-radius: 8px;
    width: 70%;
    outline: none;
`;

const NewMetadadoButton = styled.button`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    margin-left: 8px;
    width: 20%;
    background-color: #22ee22;
`;

const NewMetadadoForm = ({ metadados, onCreatePressed }) => {
    const [inputValue, setInputValue] = useState('');
    return (
        <FormContainer>
            <NewMetadadoInput
                type="text"
                placeholder="Type your new metadado here"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <NewMetadadoButton
                onClick={() => {
                    const isDuplicateText =
                        // eslint-disable-next-line prettier/prettier
                        metadados.some(metadado => metadado.text === inputValue);
                    if (!isDuplicateText) {
                        onCreatePressed(inputValue);
                        setInputValue('');
                    }
                }}
            >
                Create Metadado
            </NewMetadadoButton>
        </FormContainer>
    );
};

const mapStateToProps = (state) => ({
    metadados: getMetadados(state),
});

const mapDispatchToProps = (dispatch) => ({
    onCreatePressed: (text) => dispatch(console.log(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewMetadadoForm);
