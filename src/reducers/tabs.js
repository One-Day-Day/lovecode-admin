import { handleActions } from 'redux-actions';
import { showErrorInfoBar, closeErrorInfoBar, addTabPane, activeTabPane } from '../actions/tabs';

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
  [addTabPane]: (state, { payload }) => {
    const { layoutName, tabPane } = payload;
    return {
      ...state,
      panes: {
        ...state.panes,
        [layoutName]: [
          ...(state.panes[layoutName] || []),
          tabPane,
        ],
      },
      activeKey: {
        ...state.activeKey,
        [layoutName]: tabPane.key,
      },
    };
  },
  [activeTabPane]: (state, { payload }) => {
    const { layoutName, key } = payload;
    return {
      ...state,
      activeKey: {
        ...state.activeKey,
        [layoutName]: key,
      },
    };
  },
}, {
  errors: {},
  panes: {},
  activeKey: {},
});

export default tabs;
