import httpClient from '../utils/http';

export const createProblem = (data) => httpClient.post('/api/errors', { ...data });
