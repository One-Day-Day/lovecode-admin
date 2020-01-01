import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import defaultReducers from './reducers';

export const store = createStore(defaultReducers, applyMiddleware(ReduxThunk));

export default store;
