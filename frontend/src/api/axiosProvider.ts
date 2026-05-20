import axios from 'axios';

const BASE_URL = 'http://localhost:5073/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token on every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Global response error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error('Network Error — is the backend running?', error.message);
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    const messages: Record<number, string> = {
      400: 'Bad Request',
      401: 'Unauthorized — please log in',
      403: 'Forbidden — you do not have permission',
      404: 'Not Found',
      409: 'Conflict — resource already exists',
      422: 'Unprocessable Entity — validation failed',
      429: 'Too Many Requests — slow down',
      500: 'Internal Server Error',
      502: 'Bad Gateway',
      503: 'Service Unavailable',
    };

    console.error(`[${status}] ${messages[status] ?? 'Unexpected Error'}:`, data);

    if (status === 401) {
      localStorage.removeItem('token');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
