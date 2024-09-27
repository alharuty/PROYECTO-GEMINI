import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

// CORREGIDO
class NavbarLeft extends Component{
  
  render() {
    return (
      <div className="navegador navegador-derecho">
        
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

export default NavbarLeft;