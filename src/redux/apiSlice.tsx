import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    // Define a query to fetch all products
    getAllProducts: builder.query({
      query: () => 'products/?delay=3000',
    }),
  }),
});

export const { useGetAllProductsQuery } = productsApi;
