import React, { createContext, useState, useEffect } from 'react';

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [getCurrency, setCurrency] = useState(localStorage.getItem('currency') || 'inr');

  useEffect(() => {
    localStorage.setItem('currency', getCurrency);
  }, [getCurrency]);

  return (
    <CurrencyContext.Provider value={{ getCurrency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};
