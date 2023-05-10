import { api } from "./api";

const artsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    upload: builder.mutation({
      query: (files) => {
        const formData = new FormData();

        if (files.length > 1) {
          for (let file of files) {
            formData.append("photos", file);
          }

          return {
            url: "/arts/upload-multi",
            method: "POST",
            headers: {
              "Content-Type": undefined,
            },
            body: formData,
          };
        } else {
          formData.append("photo", files[0]);

          return {
            url: "/arts/upload",
            method: "POST",
            headers: {
              "Content-Type": undefined,
            },
            body: formData,
          };
        }
      },
    }),
    createProfile: builder.mutation({
      query: (body) => ({
        url: "/arts",
        method: "POST",
        body: body,
      }),
    }),
    getArts: builder.query({
      query: () => "/arts",
    }),
  }),
});

export const { useUploadMutation, useCreateProfileMutation, useGetArtsQuery } =
  artsApi;
