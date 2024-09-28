import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

// CORREGIDO
class NavegadorIzquierdo extends Component{
  
  render() {
    return (
      <div className="navegador navegador-izquierdo">
        
        <div className="contenedor-nav-link">
          <NavLink to="/" className="nav-link-activo">Home</NavLink>
        </div>
        
        <div className="contenedor-nav-link">
          <NavLink to="/about" className="nav-link-activo">Sobre mi</NavLink>
        </div>

      </div>
    );
  }
}

export default NavegadorIzquierdo;