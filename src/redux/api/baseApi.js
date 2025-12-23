import { axiosPrivate } from "@/lib/axios";
import { createApi } from "@reduxjs/toolkit/query/react";

const axiosBaseQuery =
  ({ axiosInstance }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axiosInstance({ url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: {
          status: false,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery({ axiosInstance: axiosPrivate }),
  tagTypes: ["Auth", "OTP"],
  endpoints: () => ({}),
});
