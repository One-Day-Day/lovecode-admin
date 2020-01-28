import { createAction, createActionPrefix } from 'redux-actions-helper';

const nameCreator = createActionPrefix('TABS');

export const showErrorInfoBar = createAction(
  nameCreator('SHOW_ERROR_INFO_BAR'),
  (targetKey, message) => ({ targetKey, message }),
);

export const closeErrorInfoBar = createAction(
  nameCreator('CLOSE_ERROR_INFO_BAR'),
  (tabPaneKey) => tabPaneKey,
);

export const addTabPane = createAction(
  nameCreator('ADD_TAB_PANE'),
  (layoutName, tabPane) => ({ layoutName, tabPane }),
);

export const removeTabPane = createAction(
  nameCreator('REMOVE_TAB_PANE'),
  (layoutName, tabPaneKey) => ({ layoutName, tabPaneKey }),
);

export const activeTabPane = createAction(
  nameCreator('ACTIVE_TAB_PANE'),
  (layoutName, key) => ({ layoutName, key }),
);
