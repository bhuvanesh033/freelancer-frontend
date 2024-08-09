import axios from 'axios';

axios.defaults.baseURL = 'https://free-lancer-1.onrender.com/api';

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Export axios as the default export
export default axios;
