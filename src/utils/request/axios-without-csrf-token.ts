import axios, { AxiosInstance } from 'axios';

// Axios request instance, we use it with public part of our app
const axiosWithoutCSRFtoken: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

export default axiosWithoutCSRFtoken;
