import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const CartData = JSON.parse(localStorage.getItem('cartDetail')) || [];
    const [cartData, setCartData] = useState(CartData);

  return (
    <CartContext.Provider value={{ cartData, setCartData }}>
      {children}
    </CartContext.Provider>
  );
};
