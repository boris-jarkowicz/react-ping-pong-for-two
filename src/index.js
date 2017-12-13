import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import defaultState, { villainState } from './redux/reducers/reducers';
import {
    getPaddleSize,
    sendPlayerData,
    getVillainData,
} from './redux/actions/actions';

const rootReducer = combineReducers({
    defaultState,
    villainState,
});

let store = createStore(
    rootReducer,
    applyMiddleware(thunk),
);

const unsubscribe = store.subscribe(() => {
    console.log('CURRENT APP STATE', store.getState());
});

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
);
