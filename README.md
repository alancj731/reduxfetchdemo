# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
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



