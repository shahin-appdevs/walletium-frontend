import { axiosPrivate } from "./axios";
import { token } from "./token";

export async function login(payload) {
  const res = await axiosPrivate.post("/login", payload);

  token.set(res.data.data.token, "local");

  return res.data;
}
