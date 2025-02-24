import { useMutation } from "@tanstack/react-query";
import { ProductAPIs } from "../API/ProductAPIs";
import { ProductsModel } from "../Model/ProductsModel";

export default function useAddProduct() {
  return useMutation({
    mutationFn: (newProduct: ProductsModel)=> ProductAPIs.ProductAdd(newProduct)
  })
}
