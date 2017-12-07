import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import './index.css';
import App from './App';
import defaultState from './redux/reducers/reducers';
import {
    getPaddleSize,
    sendPlayerData,
    getPlayerData,
} from './redux/actions/actions';

const rootReducer = combineReducers({
    defaultState,
});

let store = createStore(rootReducer);
const unsubscribe = store.subscribe(() => {

    setTimeout(() => {
        getPlayerData();
    }, 50);

    setTimeout(() => {
        sendPlayerData(store.getState());
    }, 50);

    console.log('CURRENT APP STATE', store.getState());
});

store.dispatch(getPaddleSize(), store.getState());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
);
