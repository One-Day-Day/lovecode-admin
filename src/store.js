import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { promiseMiddleware } from 'redux-actions-helper';

import defaultReducers from './reducers';

export const store = createStore(defaultReducers, applyMiddleware(ReduxThunk, promiseMiddleware));

export default store;
