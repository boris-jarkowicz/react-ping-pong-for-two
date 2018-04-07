import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import App from './App';
import { Provider } from 'react-redux'
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import playerState, {
    villainState,
    pingBallState,
    initialState
} from './redux/reducers/reducers';
import {
    getPlayerFromServerName,
    sendPlayerIdToServer,
    movePingBall,
} from './redux/actions/actions';
import { establishConnection } from './modules/client';
import { getPersistedPlayerData } from './modules/helpers';

const rootReducer = combineReducers({
    playerState,
    villainState,
    pingBallState,
});

const stateFromLocalStorage = window.localStorage.getItem('AppState')
                            ? JSON.parse(window.localStorage.getItem('AppState'))
                            : null;

export const getState = () => {
    return store.getState();
};

const persistedState =
    stateFromLocalStorage && initialState !== stateFromLocalStorage ?
        getPersistedPlayerData(
            initialState,
            stateFromLocalStorage.playerState,
        ) : null;

console.log('persistedState', persistedState);

const storeParams = [];

if (persistedState) {
    storeParams.push(
        rootReducer,
        persistedState,
        composeWithDevTools(applyMiddleware(thunk)),
    );
} else {
    storeParams.push(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunk)),
    );
}

const store = createStore(...storeParams);

console.log('INITIAL APP STATE', getState());

export const unsubscribe = store.subscribe(() => {
    console.log('CHANGING APP STATE', store.getState());
    const state = store.getState();

    if (!window.localStorage.getItem('AppState')) {
        window.localStorage.setItem('AppState', JSON.stringify(state));
    }

    if (!state.pingBallState.isMoving) {
        if (state.pingBallState.direction === 1 || state.pingBallState.direction === -1) {
            const pingBallConfig = [
                !state.pingBallState.isMoving,
                state.pingBallState.direction,
                state.pingBallState.xPos,
                state.pingBallState.yPos,
            ];

            store.dispatch(movePingBall(...pingBallConfig));
        }
    }
});

if (persistedState) {
    establishConnection(
        persistedState.playerState.playerId,
        () => store.dispatch(sendPlayerIdToServer(getState().playerState))
    );
} else {
    establishConnection(null, () => store.dispatch(getPlayerFromServerName()));
}

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
);
