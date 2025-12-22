import axiosBaseApi from "./axios";
import { token } from "./token";

export async function login(payload) {
  const res = await axiosBaseApi.post("/login", payload);

  token.set(res.data.data.token, "local");

  return res.data;
}
