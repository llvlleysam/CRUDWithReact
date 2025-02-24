import { useMutation } from "@tanstack/react-query";
import { ProductAPIs } from "../API/ProductAPIs";

export default function useDeleteProduct() {
  return useMutation({
    mutationFn: (id: string) => ProductAPIs.ProductDelete(id)
  })
}
