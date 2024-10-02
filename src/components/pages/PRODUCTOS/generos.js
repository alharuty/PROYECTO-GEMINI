import React, { Component } from 'react';
import Zoom from 'react-reveal/Zoom';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default class Productos extends Component{
  constructor() {
    super();

    this.state = {
      secciones: []
    }

    this.traerSecciones = this.traerSecciones.bind(this);

  }

  componentDidMount() {
    this.traerSecciones();
  }


  traerSecciones() {
    axios.get("https://gemini-art-api-947794bf0d42.herokuapp.com/api/generos")
    .then(response => {
      // console.log("Secciones API: ", response.data);
        this.setState({ secciones: response.data });
        // console.log("Secciones: ", this.state.secciones);
    })
    .catch(error => {
        console.log("Error al traer las secciones", error);
    });
  }


  render() {
    const { secciones } = this.state;

    return (
      <div className="productos-link generos-productos-link">
        {secciones.length > 0 ? secciones.map(seccion => (
          <div key={seccion.id} className="seccion">
            <Zoom>
              <NavLink to={seccion.nombre_genero}>
                <img src={seccion.imagen_genero} alt={seccion.nombre_genero} />
              </NavLink>
              <NavLink to={seccion.nombre_genero} className="texto-h2">
                <h2>{seccion.nombre_genero}</h2>
              </NavLink>
            </Zoom>
          </div>
        )) : (
          <div>No hay ninguna sección</div>
        )}
      </div>
    );
  }
}
