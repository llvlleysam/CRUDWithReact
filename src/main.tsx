import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import ProductsPage from "./pages/ProductsPage.tsx";
import AddProductPage from "./pages/AddProductPage.tsx";
import EditProductPage from "./pages/EditProductPage.tsx";
import CartPage from "./pages/CartPage.tsx";
import Layout from "./Layout/Layout.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/QuerySetting.ts";
import ProductPage from "./pages/ProductPage.tsx";
import { ProductsProvider } from "./lib/ProductsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProductsProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<App />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductPage />} />
              <Route path="/add" element={<AddProductPage />} />
              <Route path="/edit/:id" element={<EditProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="*" element={<h1 className="w-full h-screen text-3xl flex items-center justify-center">404 Not Found :)</h1>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ProductsProvider>
  </StrictMode>
);
