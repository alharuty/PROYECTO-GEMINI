import React, { Component } from 'react';
import ListadoProductos from "../listado-productos";

// CORREGIDO
export default class Outlet extends Component{
  render() {
    return (
      <div className="outlet">
        <h3>OUTLET</h3>
        <ListadoProductos propOutlet="1" />
      </div>
    );
  }
}
