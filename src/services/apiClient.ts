import axios, { AxiosInstance } from 'axios';

const SERVER_URL = "http://localhost:4000/";

const apiClient: AxiosInstance = axios.create({
  baseURL: SERVER_URL,
});

export default apiClient;