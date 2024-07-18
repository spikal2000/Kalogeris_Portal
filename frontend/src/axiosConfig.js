import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8081/api',
  withCredentials: true, // if you need to send cookies with your requests
});

export default axiosInstance;
