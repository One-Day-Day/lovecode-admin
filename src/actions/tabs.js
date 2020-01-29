import { createAction, createActionPrefix } from 'redux-actions-helper';

const nameCreator = createActionPrefix('TABS');

export const showErrorInfoBar = createAction(
  nameCreator('SHOW_ERROR_INFO_BAR'),
  (targetKey, message) => ({ targetKey, message }),
);

export const closeErrorInfoBar = createAction(
  nameCreator('CLOSE_ERROR_INFO_BAR'),
  (targetKey) => targetKey,
);
