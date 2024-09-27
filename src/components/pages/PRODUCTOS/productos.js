import React, { Component } from 'react';
import Zoom from 'react-reveal/Zoom';
import axios from 'axios';

// CORREGIDO
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
    axios.get("http://localhost:5000/api/secciones-navegador")
    .then(response => {
      console.log("Secciones API: ", response.data);
        this.setState({ secciones: response.data });
        console.log("Secciones: ", this.state.secciones);
    })
    .catch(error => {
        console.log("Error al traer las secciones", error);
    });
  }


  render() {
    const { secciones } = this.state;

    return (
      <div className="productos-link">
        {secciones.length > 0 ? secciones.map(seccion => (
          <Zoom>
            <div key={seccion.id} className="seccion">
              <a href={seccion.nombre_seccion}><img src={seccion.imagen_seccion}/></a>
              <a href={seccion.nombre_seccion} className="texto-h2"><h2>{seccion.nombre_seccion}</h2></a>
            </div>
          </Zoom>
        )) :
          <div> No hay ninguna seccion</div>
        }

      </div>
    );
  }
}
