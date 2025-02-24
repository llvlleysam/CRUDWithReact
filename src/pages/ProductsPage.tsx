import { useLocation } from "react-router";
import CardProduct from "../Components/cardProduct";
import SearchInput from "../Components/SearchInput";
import useGetProducts from "../Hooks/useGetProducts";

export default function ProductsPage() {
  const location = useLocation();

  const { data, isLoading, isError } = useGetProducts(
    location.search as string
  );

  return (
    <>
      <h1 className="text-3xl my-5">Products Page</h1>
      <SearchInput />
      <div className="grid grid-cols-4 gap-4">
        {data?.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
