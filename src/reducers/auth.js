import {cleanErrorMessage, getToken, setToken} from '../actions/login';
import {handleActions} from 'redux-actions';

const auth = handleActions({
    [getToken.fail]: (state, { payload }) => {
        return {
            ...state,
            authorizing: false,
            error: payload.response.data,
        };
    },
    [cleanErrorMessage]: (state, action) => {
        return {
            ...state,
            error: null,
        };
    },
    [getToken]: (state, action) => {
        return {
            ...state,
            authorizing: true,
        };
    },
    [getToken.success]: (state, {payload}) => {
        const token = payload.data.token;
        sessionStorage.setItem('token', token);
        return {
            ...state,
            token: token,
            authorizing: false,
        };
    },
    [setToken]: (state, {payload}) => {
        sessionStorage.setItem('token', payload);
        return {
            ...state,
            token: payload
        }
    }
}, {error: null, authorizing: false, token: null});

export default auth;
