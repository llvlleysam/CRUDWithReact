import { createContext, useState, ReactNode } from "react";
import { ProductsModel, shoppingCart } from "../Model/ProductsModel";

// تعریف تایپ برای Context
type ProductsContextType = {
  productsItems: shoppingCart[];
  addProduct: (product: ProductsModel) => void;
  removeProduct: (productId: number) => void;
  clearCart: () => void
  totalPrice: number
  totalCount: number
};

// ایجاد مقدار اولیه برای سبد خرید
const initialState: shoppingCart[] = [];

// ایجاد Context
export const ProductsContext = createContext<ProductsContextType>({
  productsItems: initialState,
  addProduct: () => {},
  removeProduct: () => {},
  clearCart: () => {},
  totalPrice: 0,
  totalCount: 0
});

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [productsItems, setProductsItems] = useState<shoppingCart[]>(initialState);
    const totalPrice = productsItems.reduce((total, item) => total + item.price * item.purchased, 0);
    const totalCount = productsItems.reduce((total, item) => total + item.purchased, 0);
  // اضافه کردن محصول به سبد خرید
  const addProduct = (product: ProductsModel) => {
    setProductsItems((prev) => {
      const exist = prev.find((item) => item.id === product.id);
      if (exist) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, purchased: item.purchased + 1 } : item
        );
      } else {
        return [...prev, { ...product, purchased: 1 }];
      }
    });
  };

  // حذف محصول از سبد خرید
  const removeProduct = (productId: number) => {
    setProductsItems((prev) =>
      prev
        .map((item) =>
          item.id === productId ? { ...item, purchased: item.purchased - 1 } : item
        )
        .filter((item) => item.purchased > 0)
    );
  };
  const clearCart = () => {
    setProductsItems([]);
  }
  return (
    <ProductsContext.Provider value={{ productsItems, addProduct, removeProduct ,totalPrice,totalCount,clearCart}}>
      {children}
    </ProductsContext.Provider>
  );
};
