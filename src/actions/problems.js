import { createAction, createActionPrefix } from 'redux-actions-helper';
import httpClient from '../utils/http';

const nameCreator = createActionPrefix('PROBLEM');

export const createProblem = createAction(
    nameCreator('CREATE'),
    data => httpClient.post('/api/problems', { ...data }),
);
