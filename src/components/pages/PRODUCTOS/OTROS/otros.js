import React, { Component } from 'react';
import ListadoProductos from "./../../listado-productos";

// CORREGIDO
export default class Otros extends Component{
  render() {
    return (
      <div>
        <ListadoProductos propGenero="otros" />
      </div>
    );
  }
}
