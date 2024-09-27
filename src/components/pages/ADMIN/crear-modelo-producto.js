import React, { Component } from 'react';
import axios from 'axios';

// CORREGIDO
export default class CrearModeloProducto extends Component{
  constructor() {
    super();

    this.state = {
      id_nombre_modelo: "",
      nombre_modelo: "",
      precio_modelo: ""
    }

    this.guardarInputs = this.guardarInputs.bind(this);
    this.guardarModeloNuevo = this.guardarModeloNuevo.bind(this);
  }

  guardarModeloNuevo() {
    axios.post("http://127.0.0.1:5000/api/modelos", {
      id_nombre_modelo: this.state.id_nombre_modelo,
      nombre_modelo: this.state.nombre_modelo,
      precio_modelo: this.state.precio_modelo
    }, {
      headers: {
          'Content-Type': 'application/json'
      }
    }).catch(error => {
      console.log("error guardarModeloNuevo", error);
    });
  }

  guardarInputs(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <form className="form-contenedor-subir-nuevo-modelo" onSubmit={this.guardarModeloNuevo}>
          <div className="contenedor-editor-admin">
            <div className="editor-datos-admin">

              <h3>SUBIR UN NUEVO MODELO</h3>

              <div className="input-admin">
                <input type="text" name="id_nombre_modelo" placeholder='Escribe el id del producto' value={this.state.id_nombre_modelo} onChange={this.guardarInputs}></input>
              </div>

              <div className="input-admin">
                <input type="text" name="nombre_modelo" placeholder='Escribe el nombre del producto' value={this.state.nombre_modelo} onChange={this.guardarInputs}></input>
              </div>

              <div className="input-admin">
                <input type="text" name="precio_modelo" placeholder='Escribe el precio' value={this.state.precio_modelo} onChange={this.guardarInputs}></input>
              </div>
      
            </div>
            <div> 
              <button type="submit">Guardar modelo</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
