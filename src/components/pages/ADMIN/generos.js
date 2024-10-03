import React, { Component } from 'react';
import axios from 'axios';
import { Paginacion } from '../paginacion';

export default class Generos extends Component {
  constructor() {
    super();

    this.state = {
      productos: [],
      productosPorPagina: 5,
      paginaActual: 1,
      totalProductos: 0,
    };

    this.traerGeneros = this.traerGeneros.bind(this);
    this.actualizarPaginaActual = this.actualizarPaginaActual.bind(this);
  }

  componentDidMount() {
    this.traerGeneros();
  }

  traerGeneros() {
    axios
      .get('https://gemini-art-api-947794bf0d42.herokuapp.com/api/generos')
      .then((response) => {
        this.setState({ 
          productos: response.data,
          totalProductos: response.data.length
        });
      })
      .catch((error) => {
        console.error('Error mostrando las secciones: ', error);
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
      <div className="generos-disponibles">
        <h3>Géneros disponibles</h3>
        <div className="genero">
          {productosActuales.map((producto, index) => (
            <div key={producto.id} className={`genero-dispo ${index % 2 === 0 ? 'clarito' : 'oscurito'}`}>
              <p>{producto.id} | </p>
              <p>{producto.nombre_genero}</p>
            </div>
          ))}
        </div>

        <Paginacion productosPorPagina={productosPorPagina} totalProductos={this.state.totalProductos} paginaActual={paginaActual} actualizarPaginaActual={this.actualizarPaginaActual} />
      </div>
    );
  }
}
