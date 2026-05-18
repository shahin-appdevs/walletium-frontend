import { axiosPublic } from "@/lib/axios";
import { baseApi } from "../baseApi";

export const homepageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    bannerSendMoneyInfo: builder.query({
      query: () => ({
        url: "/frontend/banner/send-money/info",
        method: "GET",
        axiosInstance: axiosPublic,
      }),
      // Transform response to handle common backend structures or formatting
      transformResponse: (response) => {
        return response?.data || response;
      },
    }),
  }),
});

export const { useBannerSendMoneyInfoQuery } = homepageApi;
