import React, { Component } from 'react';
import ListadoProductos from "../listado-productos";


function Outlet(){
  return (
    <div className="outlet">
      <h3>OUTLET</h3>
      <ListadoProductos propOutlet="1" />
    </div>
  );
}

export default Outlet;