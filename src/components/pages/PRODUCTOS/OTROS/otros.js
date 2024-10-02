import React from 'react';
import ListadoProductos from "./../../listado-productos";

function Otros(){
    return (
      <div>
        <h3>OTROS</h3>
        <ListadoProductos propGenero="Otros" />
      </div>
    );
}

export default Otros;
