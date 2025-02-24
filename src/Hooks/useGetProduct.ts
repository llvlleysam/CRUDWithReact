import { useQuery } from "@tanstack/react-query";
import { ProductAPIs } from "../API/ProductAPIs";

export default function useGetProduct(id: string) {
  return useQuery({
    queryKey: ["product"],
    queryFn: () => ProductAPIs.ProductRead(id),
  })
}
