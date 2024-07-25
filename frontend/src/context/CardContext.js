import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const CartData = JSON.parse(localStorage.getItem('cartDetail')) || [];
    const [cartData, setCartData] = useState(CartData);


    const totalProductPrice = () => {
      var sum = 0
      cartData.map((products) => {
        sum += products.product.product_price
      })
      return sum
    }

    localStorage.setItem('total_price',totalProductPrice())
  return (
    <CartContext.Provider value={{ cartData, setCartData }}>
      {children}
    </CartContext.Provider>
  );
};
