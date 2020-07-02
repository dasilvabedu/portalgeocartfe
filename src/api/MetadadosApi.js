/* eslint-disable spaced-comment */
/* eslint-disable no-use-before-define */
import {
    loadMetadadosInProgress,
    loadMetadadosSuccess,
    loadMetadadosFailure,
    loadMetadadoSelectedInProgress,
    loadMetadadoSelectedSuccess,
    loadMetadadoSelectedSuccessEditaveis,
    loadMetadadoSelectedFailure,
    removeMetadadoSelected,
    updateMetadadoSelected,
    setMetadadoSelectedMessage,
} from '../actions/actions';

// const urlBase = 'http://localhost:8080/seguranca_barragem';
const urlBase = process.env.REACT_APP_API_URL;

export const loadMetadados = () => async (dispatch) => {
    try {
        dispatch(loadMetadadosInProgress());
        const response = await fetch(
            'http://localhost:8080/seguranca_barragem/metadado/simple'
        ); // 'http://localhost:8080/seguranca_barragem/metadado/total'
        const metadados = await response.json();

        if (metadados.aresposta.codigo === 200)
            dispatch(loadMetadadosSuccess(metadados));
        else throw new Error(metadados.aresposta.mensagem);
    } catch (e) {
        dispatch(loadMetadadosFailure());
        //dispatch(displayAlert(e));
        dispatch(
            setMetadadoSelectedMessage({
                open: true,
                text: `Erro ao processar a requisição ${e}`,
                tipo: 'error',
                loading: false,
            })
        );
    }
};

export const loadMetadadosTotal = () => async (dispatch) => {
    const loadMetadadosTotalUrl =
        '/metadado/total?campos=mtt_tabela,mtt_descricao';

    try {
        dispatch(loadMetadadosInProgress());
        const response = await fetch(`${urlBase}${loadMetadadosTotalUrl}`);
        const metadados = await response.json();

        if (metadados.aresposta.codigo === 200)
            dispatch(loadMetadadosSuccess(metadados.cabecalho));
        else throw new Error(metadados.aresposta.mensagem);

        dispatch(loadDadoPorExtenso(`mta_metadadoatributo`, true));
    } catch (e) {
        dispatch(loadMetadadosFailure());
        //dispatch(displayAlert(e));
        dispatch(
            setMetadadoSelectedMessage({
                open: true,
                text: `Erro ao processar a requisição ${e}`,
                tipo: 'error',
                loading: false,
            })
        );
    }
};

// eslint-disable-next-line prettier/prettier
export const loadDadoPorExtenso = (mttTabela, edit = false) => async (dispatch) => {
    const onTabelaSelectedUrl = `/dado/extenso?mtt_tabela=${mttTabela}&limite=5`;

    try {
        if (!edit) dispatch(loadMetadadoSelectedInProgress());
        const response = await fetch(`${urlBase}${onTabelaSelectedUrl}`);
        const metadados = await response.json();

        if (!edit) {
            if (metadados.aresposta.codigo === 200)
                dispatch(loadMetadadoSelectedSuccess(mttTabela, metadados));
            else throw new Error(metadados.aresposta.mensagem);
        } else {
            dispatch(loadMetadadoSelectedSuccessEditaveis(metadados));
        }
    } catch (e) {
        dispatch(loadMetadadoSelectedFailure());
        //dispatch(displayAlert(e));
        dispatch(
            setMetadadoSelectedMessage({
                open: true,
                text: `Erro ao processar a requisição ${e}`,
                tipo: 'error',
                loading: false,
            })
        );
    }
};

export const removeMetadado = (mttTabela, id) => async (dispatch) => {
    const removeMetadadoUrl = `/dado/excluido?mtt_tabela=${mttTabela}&identificador=${id}`;
    try {
        const response = await fetch(`${urlBase}${removeMetadadoUrl}`, {
            method: 'GET', // OR DELETE
        });
        const removedMetadado = await response.json();
        dispatch(removeMetadadoSelected(removedMetadado.excluido));
        dispatch(
            setMetadadoSelectedMessage({
                open: true,
                text: removedMetadado.aresposta.mensagem,
                loading: false,
                tipo:
                    removedMetadado.aresposta.codigo === 200
                        ? 'success'
                        : 'error',
            })
        );
    } catch (e) {
        //dispatch(displayAlert(e));
        dispatch(
            setMetadadoSelectedMessage({
                open: true,
                text: `Erro ao processar a exclusão ${e}`,
                tipo: 'error',
                loading: false,
            })
        );
    }
};

export const updateMetadado = (id, json) => async (dispatch) => {
    const updateMetadadoUrl = `/dado/convencional/atualizado`;
    try {
        const body = JSON.stringify(json);
        const response = await fetch(`${urlBase}${updateMetadadoUrl}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body,
        });
        const updatedMetadado = await response.json();
        dispatch(updateMetadadoSelected(id, json));
        dispatch(
            setMetadadoSelectedMessage({
                open: true,
                text: updatedMetadado.aresposta.mensagem,
                loading: false,
                tipo:
                    updatedMetadado.aresposta.codigo === 200
                        ? 'success'
                        : 'error',
            })
        );
    } catch (e) {
        //dispatch(displayAlert(e));
        dispatch(
            setMetadadoSelectedMessage({
                open: true,
                text: `Erro ao processar a atualizacão ${e}`,
                tipo: 'error',
                loading: false,
            })
        );
    }
};

export const setMessage = (message) => async (dispatch) => {
    dispatch(setMetadadoSelectedMessage(message));
};

export const displayAlert = (text) => () => {
    // eslint-disable-next-line no-alert
    alert(`Error ${text}`);
};
