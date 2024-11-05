import axios, { AxiosInstance } from 'axios';

const csrfToken = localStorage.getItem('csrfToken');

// Axios request instance, we use it with private part of our app
const axiosWithCSRFtoken: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
  headers: {
    'X-CSRF-Token': csrfToken,
  },
});

export default axiosWithCSRFtoken;
