import { createContext, useState } from "react";

export const ProductContext = createContext();

function ProductProvider({ children }) {
  const [products, setProducts] = useState([
  {
    id: 1,
    name: "Wireless Headphones",
    price: "$99",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "$149",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Gaming Mouse",
    price: "$59",
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db",
    rating: 4.6,
  },
  {
    id: 4,
    name: "Sneakers",
    price: "$120",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    rating: 4.9,
  },
]);

  return (
    <ProductContext.Provider
      value={{ products, setProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;