import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://www.kalogeris-portal.net/api',
  withCredentials: true, //  to send cookies with requests
});

export default axiosInstance;
