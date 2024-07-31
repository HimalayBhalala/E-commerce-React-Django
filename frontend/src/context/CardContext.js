import React, { createContext, useContext, useState } from "react";
import { CurrencyContext } from "./CurrencyContex";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const {currency} = useContext(CurrencyContext); 
    const CartData = JSON.parse(localStorage.getItem('cartDetail')) || [];
    const [cartData, setCartData] = useState(CartData);

    const totalProductPrice = () => {
      var sum = 0
      if(currency === 'inr'){
        cartData.map((products) => {
          sum += products.product.product_price
        })        
      }else{
        cartData.map((products) => {
          sum += products.product.product_usd_price
        })
      }
      return sum
    }
    localStorage.setItem('total_price',totalProductPrice())
  return (
    <CartContext.Provider value={{ cartData, setCartData }}>
      {children}
    </CartContext.Provider>
  );
};
