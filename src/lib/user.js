import axiosBaseApi from "./axios";

export async function getUser() {
  const res = await axiosBaseApi.get("/user/profile/info");

  return res.data.data;
}
