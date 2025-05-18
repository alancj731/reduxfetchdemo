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
