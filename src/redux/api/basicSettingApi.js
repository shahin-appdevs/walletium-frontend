import { baseApi } from "./baseApi";

export const basicSettingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBasicSettings: builder.query({
      query: () => ({
        url: "/settings/basic-settings",
        method: "GET",
      }),
      providesTags: ["Settings"],
      // Transform response to handle common backend structures or formatting
      transformResponse: (response) => {
        return response?.data || response;
      },
      // // Clean error handling at the API level
      // transformErrorResponse: (response) => {
      //   return {
      //     status: response?.status,
      //     message: response?.data?.message || "Failed to fetch basic settings",
      //   };
      // },
    }),
  }),
});

export const { useGetBasicSettingsQuery } = basicSettingApi;
