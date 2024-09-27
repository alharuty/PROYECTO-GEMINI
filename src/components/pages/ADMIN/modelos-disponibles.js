import React, { Component } from 'react';
import axios from 'axios';
import { Paginacion } from './../paginacion';

// CORREGIDO
export default class ModelosDisponibles extends Component {
  constructor() {
    super();

    this.state = {
      productos: [],
      productosPorPagina: 5,
      paginaActual: 1,
      totalProductos: 0,
    };

    this.traerModelosDisponibles = this.traerModelosDisponibles.bind(this);
    this.actualizarPaginaActual = this.actualizarPaginaActual.bind(this);
  }

  componentDidMount() {
    this.traerModelosDisponibles();
  }

  traerModelosDisponibles() {
    axios
      .get('http://127.0.0.1:5000/api/modelos')
      .then((response) => {
        this.setState({ 
          productos: response.data,
          totalProductos: response.data.length
        });
      })
      .catch((error) => {
        console.error('Error mostrando los modelos: ', error);
      });
  }

  actualizarPaginaActual(page) {
    this.setState({ paginaActual: page });
  }

  render() {
    const { productos, productosPorPagina, paginaActual } = this.state;
    
    const ultimoIndex = paginaActual * productosPorPagina;
    const primerIndex = ultimoIndex - productosPorPagina;
    const productosActuales = productos.slice(primerIndex, ultimoIndex);

    return (
      <div className="modelos-disponibles">
        <h3>MODELOS DISPONIBLES</h3>
        <div className="productos-disponibles">
          {productosActuales.map((producto, index) => (
            <div key={producto.id_nombre_modelo} className={`modelo-dispo ${index % 2 === 0 ? 'clarito' : 'oscurito'}`}>
              <p>{producto.id_nombre_modelo} | </p>
              <p>{producto.nombre_modelo}</p>
              <p>- {producto.precio_modelo}€</p>
            </div>
          ))}
        </div>

        <Paginacion productosPorPagina={productosPorPagina} totalProductos={this.state.totalProductos} paginaActual={paginaActual} actualizarPaginaActual={this.actualizarPaginaActual} />
      </div>
    );
  }
}
