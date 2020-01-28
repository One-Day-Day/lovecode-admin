import { handleActions } from 'redux-actions';
import { cleanErrorMessage, getToken, setToken } from '../actions/login';

const auth = handleActions({
  [getToken.fail]: (state, { payload }) => ({
    ...state,
    authorizing: false,
    error: payload.response.data,
  }),
  [cleanErrorMessage]: (state) => ({
    ...state,
    error: null,
  }),
  [getToken]: (state) => ({
    ...state,
    authorizing: true,
  }),
  [getToken.success]: (state, { payload }) => {
    const token = payload.data.token;
    sessionStorage.setItem('token', token);
    return {
      ...state,
      token,
      authorizing: false,
    };
  },
  [setToken]: (state, { payload }) => {
    sessionStorage.setItem('token', payload);
    return {
      ...state,
      token: payload,
    };
  },
}, { error: null, authorizing: false, token: null });

export default auth;
