import { axiosPrivate } from "@/lib/axios";
import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";

const axiosBaseQuery =
  ({ axiosInstance }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axiosInstance({ url, method, data, params });
      return { data: result.data };
    } catch (err) {
      if (!axios.isAxiosError(err)) {
        return {
          error: {
            status: "UNKNOWN_ERROR",
            data: err?.message || "Unknown error",
          },
        };
      }

      return {
        error: {
          status: err.response?.status ?? 500,
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
