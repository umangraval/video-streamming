import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});
API.interceptors.response.use((response) => response, (error) => {
  if (error.status === 401) {
    console.log('Got 401');
  }
  return Promise.reject(error);
});

export default API;
