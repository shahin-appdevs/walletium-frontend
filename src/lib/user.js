import { axiosPrivate } from "./axios";

export async function getUser() {
  const res = await axiosPrivate.get("/user/profile/info");

  return res.data.data;
}
