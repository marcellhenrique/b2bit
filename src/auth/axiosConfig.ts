import axios from 'axios';
import { getToken, removeToken } from './authService';

const api = axios.create({
  baseURL: 'https://api.homologation.cliqdrive.com.br',
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    config.headers['Accept'] = 'application/json;version=v1_web';
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      removeToken();
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
