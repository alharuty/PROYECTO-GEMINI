import React from 'react';
import ListadoProductos from "./../../listado-productos";

// pasamos el endpoint como prop al componente ListadoProductos
function Pendientes() {
  return (
    <div className="app-manejador">
      <ListadoProductos propGenero="pendientes" />
    </div>
  );
}

export default Pendientes;
