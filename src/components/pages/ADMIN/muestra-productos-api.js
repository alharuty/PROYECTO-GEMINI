import React from 'react';
import Iconos from '../../helper/iconos';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

Iconos();

const MuestraProductosApi = props => {

  const listaProductos = props.data.map(elProducto => {
    return (
      <div key={elProducto.id} className="contenedor-stock contenedor-stock-admin">
        <div className="item">

          <div className="botones-administrador">
            <div className="boton-borrar-item">
              <button onClick={() => props.eliminarElProducto(elProducto)}>X</button>
            </div>
            <div className="boton-editar-item">
              <button onClick={() => props.editarElProducto(elProducto)}><FontAwesomeIcon icon="pen-to-square" className='icono-editar' /></button>
            </div>
          </div>

          <div className="nombre-unidades">
            <p className="nombre-producto">{elProducto.nombre}:</p>
            <p>{elProducto.cantidadStock}</p>
          </div>

          <img src={elProducto.imagen} alt={elProducto.nombre}/>

          <div className="info-producto">
            <p>Precio: {elProducto.precio}€</p>
            <p>Color: {elProducto.color}</p>
            <p>Id: {elProducto.id}</p>
          </div>
          
        </div>
      </div>
      
    );
  });

  return <div className="contenedor-productos-api contenedor-productos-api-admin">{listaProductos}</div>
}
export default MuestraProductosApi;