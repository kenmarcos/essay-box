import storage from "@/utils/storage";
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = storage.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers.Accept = "application/json";
  return config;
};

api.interceptors.request.use(authRequestInterceptor);
