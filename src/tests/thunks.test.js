/* eslint-disable no-undef */
import 'node-fetch';
import fetchMock from 'fetch-mock';
import { expect } from 'chai';
import sinon from 'sinon';
import { loadMetadados } from '../api/MetadadoApi';

describe('The loadMetadados thunk', () => {
    it('Dispatches the correct actions in the success scenario', async () => {
        const fakeDispatch = sinon.spy();

        const fakeMetadados = [{ text: '1' }, { text: '2' }];
        fetchMock.get(
            'http://localhost:8080/seguranca_barragem/metadado/simple',
            // 'http://localhost:8080/seguranca_barragem/metadado/total'
            fakeMetadados
        );

        const expectedFirstAction = { type: 'LOAD_METADADOS_IN_PROGRESS' };
        const expectedSecondAction = {
            type: 'LOAD_METADADOS_SUCCESS',
            payload: {
                metadados: fakeMetadados,
            },
        };

        await loadMetadados()(fakeDispatch);

        expect(fakeDispatch.getCall(0).args[0]).to.deep.equal(
            expectedFirstAction
        );
        expect(fakeDispatch.getCall(1).args[0]).to.deep.equal(
            expectedSecondAction
        );

        fetchMock.reset();
    });
});
