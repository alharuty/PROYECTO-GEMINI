import React from 'react';


// CORREGIDO
const NavbarRight = () => {

  return (
    <div className="navegador navegador-izquierdo">
      <ul className="navegador-principal">
        <li className="navegador-item">
          <a href="./productos" className="productos">Productos</a>
          <ul className="navegador-subcategoria">
            <li className="navegador-subitem"><a href="./pendientes">Pendientes</a></li>
            {/* <li className="navegador-subitem"><a href="./anillos">Anillos</a></li> */}
            <li className="navegador-subitem"><a href="./cuadros">Cuadros</a></li>
            <li className="navegador-subitem"><a href="./otros">Otros</a></li>
          </ul>
        </li>
        <li className="navegador-item"><a href="./outlet">OUTLET</a></li>
      </ul>
    </div>


  );
}

export default NavbarRight;