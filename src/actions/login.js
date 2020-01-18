import {createAction, createActionPrefix} from 'redux-actions-helper';
import * as tokenApi from '../api/token';

const nameCreator = createActionPrefix('TOKEN');

export const getToken = createAction(
    nameCreator('GET_TOKEN'),
    tokenApi.getToken,
    () => ({isAutoDispatchResult: true}),
);

export const setToken = createAction(
    nameCreator('SET_TOKEN'),
);

export const cleanErrorMessage = createAction(
    nameCreator('CLEAN_ERROR_MESSAGE')
);
