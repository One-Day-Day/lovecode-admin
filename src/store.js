import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import promiseMiddleware from './utils/promiseMiddleware';
import defaultReducers from './reducers';

const middleware = [
  ReduxThunk,
  promiseMiddleware,
];

let composeEnhancers = compose;

if (process.env.REACT_APP_ENV === 'debug' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}

export const store = createStore(defaultReducers, composeEnhancers(applyMiddleware(...middleware)));

export default store;
