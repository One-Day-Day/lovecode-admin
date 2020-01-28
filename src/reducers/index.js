import { combineReducers } from 'redux';
import tabs from './tabs';
import auth from './auth';

export default combineReducers({
  tabs,
  auth,
});
