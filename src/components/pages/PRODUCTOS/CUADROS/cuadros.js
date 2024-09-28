import React, { Component } from 'react';
import ListadoProductos from "./../../listado-productos";

// CORREGIDO
export default class Cuadros extends Component{
  render() {
    return (
      <div className="cuadros">
        <ListadoProductos propGenero="cuadros" />
      </div>
    );
  }
}
