import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import api from "../api.json";
// import { apiUrl } from "../apiUrl";

const { REACT_APP_API_URL } = process.env;
// const ProductUrl = api.ProductUrl;
// const ProductUrl = apiUrl.ProductUrl;

export const productSlice = createApi({
  reducerPath: "product",
  baseQuery: fetchBaseQuery({ baseUrl: REACT_APP_API_URL + "/product" }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/",
      providesTags: ["Product"],
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: "/",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `/${product.id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const { useGetProductsQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation } = productSlice;
