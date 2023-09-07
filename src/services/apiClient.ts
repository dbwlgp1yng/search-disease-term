import axios, { AxiosInstance } from 'axios';

const SERVER_URL = "https://assignment-api-rho.vercel.app/";

const apiClient: AxiosInstance = axios.create({
  baseURL: SERVER_URL,
});

export default apiClient;