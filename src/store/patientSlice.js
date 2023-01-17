import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const patientSlice = createApi({
  reducerPath: "patient",
  baseQuery: fetchBaseQuery({ baseUrl: "https://hapi.fhir.org/baseR4/Patient" }),
  tagTypes: ["Patient"],
  endpoints: (builder) => ({
    getPatients: builder.query({
      query: () => "/",
      providesTags: ["Patient"],
    }),
  }),
});

export const { useGetPatientsQuery } = patientSlice;
