import { baseApi } from "./baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/user/profile/info",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: "/user/profile/info/update",
        method: "POST",
        data: profileData,
      }),
    }),
    updatePassword: builder.mutation({
      query: (passwordInfo) => ({
        url: "/user/profile/password/update",
        method: "POST",
        data: passwordInfo,
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
} = profileApi;
