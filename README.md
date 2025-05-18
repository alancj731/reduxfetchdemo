## A demo how to use redux toolkit API to fetch data

### Create vite project
```bash
npm create vite@latest rtkdemo # select React and TypeScript when creating the project
cd rtkdemo
npm install
``` 
## Add tailwind
**install tailwind package**
```bash
npm install tailwindcss @tailwindcss/vite
```
**change vite.config.js**
```ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

**import tailwind in css**
```css
@import "tailwindcss";
```

## Add Redux
**install redux**
```bash
npm i react-redux @reduxjs/toolkit
```
**Add redux store**
```bash
mkdir src/redux && touch src/redux/store.tsx && touch src/redux/apiSlice.tsx
```

**Create Store in store.tsx**
```ts
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {}
}
);
```

**Add store in App.tsx**
```ts
import { store } from "./redux/store.tsx";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div className="p-8 bg-white rounded-xl shadow-md text-center">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Data Page</h1>
            <p className="text-gray-700 mb-4">
              This is a simple example of using Redux Toolkit with React.
            </p>
            // <DataPage /> will add later
      </div>
    </Provider>
  );
}
```

**Create apiSlice for the store**
```ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    // Define a query to fetch all products
    getAllProducts: builder.query({
      query: () => 'products',
    }),
  }),
});

export const { useGetAllProductsQuery} = productsApi;

```

**Create a DataPage.tsx**
```ts
"use client";
import { useGetAllProductsQuery } from "../redux/apiSlice";

export default function DataPage() {
  const { data, isFetching } = useGetAllProductsQuery({});
  console.log(data);
  if (isFetching) {
    return <div>Loading data...</div>;
  }
  return (
    <div>
      <div>
        {data.products.map((product: any, index: number) => (
          <div
            key={index}
            className="flex justify-start space-x-4 border-b"
          >
            <p className="text-lg font-bold">{product.title}</p>
            <p className="text-gray-500">Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

**update store.tsx**
```ts
import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./apiSlice";

export const store = configureStore({
  reducer: {
    // Add the productsApi reducer to the store
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
```

### Now you can use redux toolkit api builder to fetch data.



