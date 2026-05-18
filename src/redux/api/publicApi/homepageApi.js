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
    subscriberSubmit: builder.mutation({
      query: (payload) => ({
        url: "/frontend/subscriber/submit",
        method: "POST",
        data: payload,
        axiosInstance: axiosPublic,
      }),
    }),
    contactSubmit: builder.mutation({
      query: (payload) => ({
        url: "/frontend/contact/submit",
        method: "POST",
        data: payload,
        axiosInstance: axiosPublic,
      }),
    }),
  }),
});

export const {
  useBannerSendMoneyInfoQuery,
  useSubscriberSubmitMutation,
  useContactSubmitMutation,
} = homepageApi;
