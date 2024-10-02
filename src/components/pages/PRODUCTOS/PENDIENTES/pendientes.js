import React from 'react';
import ListadoProductos from "./../../listado-productos";

function Pendientes() {
  return (
    <div>
      <h3>PENDIENTES</h3>
      <ListadoProductos propGenero="pendientes" />
    </div>
  );
}

export default Pendientes;
