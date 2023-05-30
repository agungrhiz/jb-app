// httpRequest.ts
import { environment } from '@env/environment';
import axios from 'axios';
import { handleHttpError } from './handleError';

const httpClientRequest = axios.create({
  baseURL: environment.serverUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

httpClientRequest.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpClientRequest.interceptors.response.use(
  (response) => response,
  ({ message, response: { data, status } }) => {
    return handleHttpError({ message, data, status })
  },
);

export default httpClientRequest;
