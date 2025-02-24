import { useMutation } from "@tanstack/react-query";
import { ProductsModel } from "../Model/ProductsModel";
import { ProductAPIs } from "../API/ProductAPIs";

export default function useEditProduct() {
  return useMutation({
    mutationFn: ({
      ProductEdited,
      id,
    }: {
      ProductEdited: ProductsModel;
      id: string;
    }) => ProductAPIs.ProductEdit({ id, ProductEdited }),
  });
}
