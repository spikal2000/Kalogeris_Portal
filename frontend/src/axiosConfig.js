import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://kalogeris-portal.net/api',
  withCredentials: true, // if you need to send cookies with your requests
});

export default axiosInstance;
