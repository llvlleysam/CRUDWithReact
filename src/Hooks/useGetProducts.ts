import { useQuery } from "@tanstack/react-query";
import { ProductAPIs } from "../API/ProductAPIs";

export default function useGetProducts(search: string) {
  return useQuery({
    queryKey: ["products", search],
    queryFn: () => ProductAPIs.ProductsRead(search),
  })
}
