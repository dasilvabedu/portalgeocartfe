/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { hot } from 'react-hot-loader';
import { loadMetadados } from '../../api/MetadadosApi';
import NewMetadadoForm from '../Forms/NewMetadadoForm';
import MetadadoListItem from './MetadadoListItem';

import {
    getMetadadosLoading,
    getAllMetadados,
} from '../../selectors/selectors';

const ListWrapper = styled.div`
    max-width: 700px;
    margin: auto;
`;

const MetadadoList = ({
    metadados,
    onUpdatedPressed,
    isLoading,
    startLoadingMetadados,
}) => {
    useEffect(() => {
        startLoadingMetadados();
    }, []);

    const loadingMessage = <div>Loading metadados...</div>;
    const content = (
        <ListWrapper>
            <NewMetadadoForm />
            <h3>Metadados</h3>
            {metadados.map((metadado) => (
                <MetadadoListItem
                    key={metadado.id}
                    metadado={metadado}
                    onUpdatedPressed={onUpdatedPressed}
                />
            ))}
        </ListWrapper>
    );
    return isLoading ? loadingMessage : content;
};

const mapStateToProps = (state) => ({
    isLoading: getMetadadosLoading(state),
    metadados: getAllMetadados(state),
});

const mapDispatchToProps = (dispatch) => ({
    onUpdatedPressed: (id) => dispatch(console.log(id)),
    startLoadingMetadados: () => dispatch(loadMetadados()),
});

const MetadadoListToExport = connect(
    mapStateToProps,
    mapDispatchToProps
)(MetadadoList);
export default hot(module)(MetadadoListToExport);
