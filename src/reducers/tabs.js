import { handleActions } from 'redux-actions';
import { showErrorInfoBar, closeErrorInfoBar } from '../actions/tabs';

const tabs = handleActions({
  [showErrorInfoBar]: (state, { payload }) => {
    const { targetKey, message } = payload;
    return {
      ...state,
      errors: {
        ...state.errors,
        [targetKey]: message,
      },
    };
  },
  [closeErrorInfoBar]: (state, { payload }) => ({
    ...state,
    errors: {
      ...state.errors,
      [payload]: null,
    },
  }),
}, {
  errors: {},
});

export default tabs;
