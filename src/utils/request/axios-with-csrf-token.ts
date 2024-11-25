import axios, { AxiosInstance } from 'axios';

const axiosWithCSRFtoken: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

axiosWithCSRFtoken.interceptors.request.use((config) => {
  const csrfToken = localStorage.getItem('csrfToken');
  // eslint-disable-next-line no-param-reassign
  config.headers['x-csrf-token'] = csrfToken || undefined;
  return config;
});

export default axiosWithCSRFtoken;
