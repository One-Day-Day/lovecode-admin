import { handleActions } from 'redux-actions';
import { showErrorInfoBar, closeErrorInfoBar } from '../actions/errors';

const errors = handleActions({
    [showErrorInfoBar]: (state, { payload }) => {
        const {targetKey, message} = payload;
        return {
            ...state,
            [targetKey]: message
        };
    },
    [closeErrorInfoBar]: (state, { payload }) => {
        delete state[payload];
        return {
            ...state,
        };
    },
}, {});

export default errors;