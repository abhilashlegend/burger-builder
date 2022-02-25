import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import { watchAuth, watchOrder } from './store/sagas/index';

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer, 
  order: orderReducer,
  auth: authReducer
});

const sagaMiddleware = createSagaMiddleware();


const reduxext = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const store = createStore(rootReducer, reduxext(applyMiddleware(thunk, sagaMiddleware )));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchOrder);


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
