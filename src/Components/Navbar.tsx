import { useContext } from "react";
import { NavLink } from "react-router";
import { ProductsContext } from "../lib/ProductsContext";

export default function Navbar() {
  const { totalCount } = useContext(ProductsContext);
  return (
    <div className="flex gap-4">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-white border rounded py-2 px-4 hover:bg-white/50 transition-all delay-100"
            : "text-gray-500 border rounded py-2 px-4 hover:bg-white/80 transition-all delay-100"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/products"
        className={({ isActive }) =>
          isActive
            ? "text-white border rounded py-2 px-4 hover:bg-white/50 transition-all delay-100"
            : "text-gray-500 border rounded py-2 px-4 hover:bg-white/80 transition-all delay-100"
        }
      >
        Products
      </NavLink>
      <NavLink
        to="/cart"
        className={({ isActive }) =>
          isActive
            ? "text-white border rounded py-2 px-4 hover:bg-white/50 transition-all delay-100 relative"
            : "text-gray-500 border rounded py-2 px-4 hover:bg-white/80 transition-all delay-100 relative"
        }
      >
        Cart
        {totalCount > 0 && <span className=" absolute top-[-10px] right-[-10px] bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center">{totalCount}</span>}
      </NavLink>
      <NavLink
        to="/add"
        className={({ isActive }) =>
          isActive
            ? "text-white border rounded py-2 px-4 hover:bg-white/50 transition-all delay-100"
            : "text-gray-500 border rounded py-2 px-4 hover:bg-white/80 transition-all delay-100"
        }
      >
        Add Product
      </NavLink>
    </div>
  );
}
