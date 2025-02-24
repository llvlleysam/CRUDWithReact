import { useContext } from "react";
import { ProductsContext } from "../lib/ProductsContext";
import CardProduct from "../Components/cardProduct";

export default function CartPage() {
  const { productsItems, totalPrice, totalCount, clearCart } =
    useContext(ProductsContext);
  return (
    <div>
      <h1 className="text-3xl font-bold"> Cart Page</h1>
      <div className="my-4 flex justify-center items-center gap-2">
        <div>
          <p>totalPrice : {totalPrice}</p>
          <p>totalCount : {totalCount}</p>
        </div>
        <button
          className={`${
            productsItems.length !== 0
              ? "bg-orange-500 hover:bg-orange-700 cursor-pointer"
              : "bg-gray-500 cursor-not-allowed"
          }  text-white font-bold py-2 px-4 my-4 rounded`}
          onClick={clearCart}
          disabled={productsItems.length === 0}
        >
          Clear Cart
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {productsItems.map((item) => (
          <CardProduct key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}
