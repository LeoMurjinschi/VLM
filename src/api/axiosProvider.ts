import axios from 'axios';

// ── Base URL ──────────────────────────────────────────────────────────────────
// Points to the running .NET backend. Change port if your launchSettings.json uses a different one.
const BASE_URL = 'http://localhost:5073/api';

// ── Axios Instance ────────────────────────────────────────────────────────────
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Request Interceptor ───────────────────────────────────────────────────────
// Runs before every request — good place to attach auth tokens later
axiosInstance.interceptors.request.use(
  (config) => {
    // Future: attach JWT token here
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor ──────────────────────────────────────────────────────
// Runs after every response — handles global error codes
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          console.error('Bad Request:', error.response.data);
          break;
        case 404:
          console.error('Not Found:', error.response.data);
          break;
        case 500:
          console.error('Server Error:', error.response.data);
          break;
        default:
          console.error('Unexpected Error:', error.response.status);
      }
    } else {
      console.error('Network Error — is the backend running?', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
