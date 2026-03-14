import axios from "axios";
import { useAuthStore } from "@/store/auth.store";

export const apiClient = axios.create({
  baseURL: "http://192.168.100.249:3000",
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const data = error.response.data;

      let message = "Something went wrong";

      if (Array.isArray(data?.message)) {
        message = data.message.join("\n");
      } else if (typeof data?.message === "string") {
        message = data.message;
      }

      if (error.response.status === 401) {
        useAuthStore.getState().logout();
      }

      return Promise.reject(new Error(message));
    }

    return Promise.reject(error);
  }
);
