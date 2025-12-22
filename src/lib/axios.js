import axios from "axios";
import { token } from "./token";

const axiosBaseApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

//  Attach token to every request
axiosBaseApi.interceptors.request.use((config) => {
  const authToken = token.get();

  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

//  Handle expired / invalid token
axiosBaseApi.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      token.remove();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosBaseApi;
