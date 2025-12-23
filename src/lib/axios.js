import axios from "axios";
import { token } from "./token";

const axiosPublic = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/v1`,
});

const axiosPrivate = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/v1`,
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
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export { axiosPublic, axiosPrivate };
