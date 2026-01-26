import axios from "axios";
import { token, userInfo } from "./token";

const axiosPublic = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1`,
});

const axiosPrivate = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
});

//  Attach token to every request
axiosPrivate.interceptors.request.use((config) => {
  const authToken = token.get();

  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

//  Handle expired / invalid token
axiosPrivate.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      token.remove();
      userInfo.remove();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export { axiosPublic, axiosPrivate };
