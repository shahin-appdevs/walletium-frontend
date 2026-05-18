import { axiosPublic } from "@/lib/axios";
import { baseApi } from "../baseApi";

export const subscriberApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    subscriberSubmit: builder.mutation({
      query: (payload) => ({
        url: "/frontend/subscriber/submit",
        method: "POST",
        data: payload,
        axiosInstance: axiosPublic,
      }),
    }),
  }),
});

export const { useSubscriberSubmitMutation } = subscriberApi;
