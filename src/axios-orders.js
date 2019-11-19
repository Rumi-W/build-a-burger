import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api-burgers.firebaseio.com/'
});

export default axiosInstance;
