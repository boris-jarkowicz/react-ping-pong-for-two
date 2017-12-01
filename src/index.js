import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import './index.css';
import App from './App';
import reducers from './redux/reducers/reducers';
import {
    getPaddleSize,
} from './redux/actions/actions';

//import registerServiceWorker from './registerServiceWorker';

let store = createStore(reducers);

console.log('store.getState()', store.getState());
store.dispatch(getPaddleSize(), store.getState());


ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
);
//registerServiceWorker();
