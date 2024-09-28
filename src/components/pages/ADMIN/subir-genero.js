import React, { Component } from 'react';
import axios from 'axios';

export default class CrearModeloProducto extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      nombre_genero: "",
      imagen_genero: null // La imagen debe inicializarse como null
    };

    this.guardarInputs = this.guardarInputs.bind(this);
    this.guardarGeneroNuevo = this.guardarGeneroNuevo.bind(this);
  }

  guardarGeneroNuevo(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("id", this.state.id);
    formData.append("nombre_genero", this.state.nombre_genero);
    formData.append("imagen_genero", this.state.imagen_genero);

    axios.post("http://127.0.0.1:5000/api/generos", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log("Genero guardado exitosamente", response.data);
    })
    .catch(error => {
      console.error("Error guardarGeneroNuevo", error);
    });
  }

  guardarInputs(event) {
    const { name, type, files, value } = event.target;
    this.setState({
      [name]: type === "file" ? files[0] : value
    });
  }

  render() {
    return (
      <div>
        <form className="form-contenedor-subir-nuevo-modelo" onSubmit={this.guardarGeneroNuevo}>
          <div className="contenedor-editor-admin">
            <div className="editor-datos-admin">
              <h3>SUBIR UN NUEVO GÉNERO</h3>

              <div className="input-admin">
                <input type="text" name="id" placeholder="Escribe el id del genero" value={this.state.id} onChange={this.guardarInputs} required />
              </div>

              <div className="input-admin">
                <input type="text" name="nombre_genero" placeholder="Escribe el género" value={this.state.nombre_genero} onChange={this.guardarInputs} required />
              </div>

              <div className="input-admin">
                <input type="file" name="imagen_genero" onChange={this.guardarInputs} required />
              </div>

            </div>
            
            <div> 
              <button type="submit">Guardar genero</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
