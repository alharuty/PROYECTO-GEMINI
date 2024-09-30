import React from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';


const NavegadorDerecho = () => {

  return (

    <div className="navegador navegador-derecho">
      <ul className="navegador-principal">

        <li className="navegador-item outlet">
          <NavLink to="/outlet">OUTLET</NavLink>
        </li>

        <li className="navegador-item">

          <NavLink to="/productos" className="productos">Productos</NavLink>
            <ul className="navegador-subcategoria">

              <li className="navegador-subitem">
                <NavLink to="/pendientes">Pendientes</NavLink>
              </li>

              <li className="navegador-subitem">
                <NavLink to="/cuadros">Cuadros</NavLink>
              </li>

              <li className="navegador-subitem">
                <NavLink to="/otros">Otros</NavLink>
              </li>
            </ul>
        </li>
        
      </ul>
    </div>

  );
}

export default NavegadorDerecho;