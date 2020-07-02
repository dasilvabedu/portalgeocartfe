/* eslint-disable no-param-reassign */
/* eslint-disable prettier/prettier */
/* eslint-disable array-callback-return */
/* eslint-disable import/named */
import {
    LOAD_METADADOS_IN_PROGRESS,
    LOAD_METADADOS_SUCCESS,
    LOAD_METADADOS_FAILURE,
    LOAD_METADADO_SELECTED_IN_PROGRESS,
    LOAD_METADADO_SELECTED_SUCCESS,
    LOAD_METADADO_SELECTED_SUCCESS_EDITAVEIS,
    LOAD_METADADO_SELECTED_FAILURE,
    REMOVE_METADADO_SELECTED,
    UPDATE_METADADO_SELECTED,
    SET_METADADO_SELECTED_MESSAGE,
} from '../actions/actions';

const initialState = { isLoading: false, data: [] };
export const metadados = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case LOAD_METADADOS_SUCCESS: {
            // eslint-disable-next-line no-shadow
            const { metadados } = payload;
            return {
                ...state,
                isLoading: false,
                data: metadados,
            };
        }

        case LOAD_METADADOS_IN_PROGRESS: {
            return {
                ...state,
                isLoading: true,
            };
        }

        case LOAD_METADADOS_FAILURE: {
            return {
                ...state,
                isLoading: false,
            };
        }

        default:
            return state;
    }
};

const initialStateSelected = {
    isLoading: false,
    data: [],
    cabecalho: [],
    campos: [],
    dados: [],
    editaveis: [],
    mttTabela: null,
    message: {
        open: false,
        text: null,
        tipo: 'success',
        loading: false,
    },
};
export const metadadoSelected = (state = initialStateSelected, action) => {
    const { type, payload } = action;
    switch (type) {
        case LOAD_METADADO_SELECTED_SUCCESS: {
            // eslint-disable-next-line no-shadow
            const { mttTabela, metadados } = payload;
            return {
                ...state,
                isLoading: false,
                data: metadados,
                cabecalho: metadados.cabecalho,
                campos: metadados.campos,
                dados: metadados.dados,
                mttTabela,
                message: { open: false, text: null, tipo: 'success', loading: false, },
            };
        }

        case LOAD_METADADO_SELECTED_SUCCESS_EDITAVEIS: {
            // eslint-disable-next-line no-shadow
            const { metadados } = payload;
            return {
                ...state,
                editaveis: metadados.campos,
            };
        }

        case REMOVE_METADADO_SELECTED: {
            const { metadadoId: metadadoIdToRemove } = payload;
            return {
                ...state,
                dados: state.dados.filter(
                    // eslint-disable-next-line eqeqeq
                    (dado) => dado[Object.keys(dado)[0]] != metadadoIdToRemove
                ),
            };
        }

        case UPDATE_METADADO_SELECTED: {
            const { id: idToUpdate, campo: campoUpdated } = payload;

            return {
                ...state,
                campos: state.campos.map(
                    // eslint-disable-next-line eqeqeq
                    (campo) => {
                        // eslint-disable-next-line eqeqeq
                        if (campo[Object.keys(campo)[0]] == idToUpdate) {
                            // eslint-disable-next-line no-unused-vars
                            Object.entries(campo).map(([keyCampo, valCampo]) => {
                                Object.entries(campoUpdated).map(([keyCampoUpdate, valCampoUpdate]) => {
                                    if(keyCampo.split(' (')[1] === `${keyCampoUpdate})`){
                                        campo[keyCampo] = valCampoUpdate;
                                    }
                                })
                            })
                        }
                        return campo;
                    }
                ),
            };
        }

        case SET_METADADO_SELECTED_MESSAGE: {
            const { message } = payload;
            return {
                ...state,
                message,
            };
        }

        case LOAD_METADADO_SELECTED_IN_PROGRESS: {
            return {
                ...state,
                isLoading: true,
            };
        }

        case LOAD_METADADO_SELECTED_FAILURE: {
            return {
                ...state,
                isLoading: false,
            };
        }

        default:
            return state;
    }
};
