import React, { useContext } from 'react';
import NavegadorDerecho from "./navegador-derecho";
import NavegadorIzquierdo from "./navegador-izquierdo";
import Logo from "../../../../static/assets/images/Logo-sin-fondo.png";
import { NavLink } from 'react-router-dom';
import Carrito from "../PAGOS/carrito";
import { ContextoCarrito } from '../PAGOS/contenido-carrito';

function ComponenteNavegador() {
  const { allProducts, setAllProducts, total, setTotal, countProducts, setCountProducts } = useContext(ContextoCarrito);

  return (
    <div className="contenedor-navegador">
      <header className="subcontenedor-navegador">
        <div className="navegador-general">

          <NavegadorIzquierdo />

          <NavLink to="/" >

            <img src={Logo} className="logo-gemini" alt="Logo de GeminiArt" height="140" />

          </NavLink>

          <NavegadorDerecho />

          <Carrito allProducts={allProducts} setAllProducts={setAllProducts} total={total} setTotal={setTotal} countProducts={countProducts} setCountProducts={setCountProducts} />
        
          <a href="/auth">Iniciar sesion</a>
        </div>
      </header>
    </div>
  );
}

export default ComponenteNavegador;
