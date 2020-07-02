/* eslint-disable spaced-comment */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable import/extensions */
import React from 'react';
import ReactDOM from 'react-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { configureStore } from './store';
import BasePage from './layout/BasePage';
import Metadados from './components/Lists/Metadados';
import NotFound from './pages/NotFound/NotFound';
import './index.css';

const store = configureStore();
const persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
            <BrowserRouter basename="/">
                <BasePage>
                    <Switch>
                        <Route exact path="/" component={Metadados} />
                        <Route component={NotFound} />
                    </Switch>
                </BasePage>
            </BrowserRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);
