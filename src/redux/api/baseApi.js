import { axiosPrivate } from "@/lib/axios";
import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";

const axiosBaseQuery =
  ({ axiosInstance }) =>
  async ({ url, method, data, params, headers }) => {
    try {
      // 1. Get the current locale from the URL (e.g., /en/dashboard -> en)
      const lang =
        typeof window !== "undefined"
          ? window.location.pathname.split("/")[1] || "en"
          : "en";

      const result = await axiosInstance({
        url,
        method,
        data,
        // 2. Globally inject the lang parameter
        params: { ...params, lang },
        headers: {
          ...headers,
          // "User-Agent":
          //   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        },
      });

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
  tagTypes: ["Auth", "OTP", "recipients", "transaction", "Settings", "notification"],
  endpoints: () => ({}),
});

//********************old without global lang and bot protection config********************

// import { axiosPrivate } from "@/lib/axios";
// import { createApi } from "@reduxjs/toolkit/query/react";
// import axios from "axios";

// const axiosBaseQuery =
//   ({ axiosInstance }) =>
//   async ({ url, method, data, params }) => {
//     try {
//       const result = await axiosInstance({ url, method, data, params });
//       return { data: result.data };
//     } catch (err) {
//       if (!axios.isAxiosError(err)) {
//         return {
//           error: {
//             status: "UNKNOWN_ERROR",
//             data: err?.message || "Unknown error",
//           },
//         };
//       }

//       return {
//         error: {
//           status: err.response?.status ?? 500,
//           data: err.response?.data || err.message,
//         },
//       };
//     }
//   };

// export const baseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery: axiosBaseQuery({ axiosInstance: axiosPrivate }),
//   tagTypes: ["Auth", "OTP", "recipients"],
//   endpoints: () => ({}),
// });
