import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import playerState, { villainState } from './redux/reducers/reducers';
import {
    getPlayerFromServerName,
    sendPlayerIdToServer,
} from './redux/actions/actions';
import { establishConnection } from './client';

const rootReducer = combineReducers({
    playerState,
    villainState,
});

const getPersistedState = window.localStorage.getItem('playerData')
                            ? JSON.parse(window.localStorage.getItem('playerData'))
                            : {};

export const getState = () => {
    return store.getState();
};

const persistedState = Object.assign({}, getPersistedState);
console.log('persistedState', persistedState);

const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(thunk),
);

console.log('INITIAL APP STATE', getState().playerState);

export const unsubscribe = store.subscribe(() => {
    console.log('LIVE APP STATE', store.getState().playerState);

    const state = store.getState();

    if (!window.localStorage.getItem('playerData')) {
        window.localStorage.setItem('playerData', JSON.stringify(state));
    }
});

if (Object.entries(persistedState).length === 0) {
    establishConnection(null, () => store.dispatch(getPlayerFromServerName()));
} else {
    establishConnection(
        persistedState.playerState.playerId,
        () => store.dispatch(sendPlayerIdToServer(getState().playerState))
    );
}

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
);
