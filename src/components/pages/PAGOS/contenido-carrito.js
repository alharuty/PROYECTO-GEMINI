import React, { createContext, useState, useEffect } from "react";

// CORREGIR NOMBRES DE VARIABLES

// creamos el contexto
export const ContextoCarrito = createContext();

export const CartProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedTotal = localStorage.getItem('total');
    const savedCount = localStorage.getItem('count');
    if (savedCart, savedTotal, savedCount){
      setAllProducts(JSON.parse(savedCart));
      setTotal(parseFloat(savedTotal));
      setCountProducts(parseInt(savedCount, 10));
    }
  }, []);

  // al actualizar el carrito, guardaramos en localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(allProducts));
    localStorage.setItem('total', total.toString());
    localStorage.setItem('count', countProducts.toString());
  }, [allProducts, total, countProducts]);


  const limpiarCarrito = () => { setAllProducts([]); setTotal(0); setCountProducts(0); };

  return (
    <ContextoCarrito.Provider value={{ allProducts, setAllProducts, total, setTotal, countProducts, setCountProducts, limpiarCarrito }}>{children}</ContextoCarrito.Provider>
  );
};
