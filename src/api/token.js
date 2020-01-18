import httpClient from '../utils/http';

export const getToken = (username, password) => httpClient.post('/api/tokens', {username, password});
