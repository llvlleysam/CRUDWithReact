import { AxiosResponse } from "axios";
import { endpoints } from "../Constant/URLs";
import { httpService } from "../Services/httpServices";
import { ProductsModel } from "../Model/ProductsModel";

export default async function ProductsRead(search: string) {
  try {
    const res: AxiosResponse<ProductsModel[]> = await httpService.get(
      `${endpoints.products}${search}`
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
}

 async function ProductRead(id: string) {
  try {
    const res: AxiosResponse<ProductsModel> = await httpService.get(
      `${endpoints.products}/${id}`
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
}

async function ProductAdd(newProduct: ProductsModel) {
  try {
    const res: AxiosResponse<ProductsModel> = await httpService.post(
      `${endpoints.products}`,
      newProduct
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
}

async function ProductDelete(id : string) {
  try {
    const res: AxiosResponse<ProductsModel> = await httpService.delete(
      `${endpoints.products}/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}

async function ProductEdit({id , ProductEdited}:{id : string , ProductEdited: ProductsModel}) {
  try {
    const res: AxiosResponse<ProductsModel> = await httpService.patch(
      `${endpoints.products}/${id}`,
      ProductEdited);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}

const ProductAPIs = {
  ProductsRead,
  ProductRead,
  ProductAdd,
  ProductDelete,
  ProductEdit
};
export { ProductAPIs };
