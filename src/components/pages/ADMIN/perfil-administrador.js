import React, { Component } from 'react';
import MuestraProductosApi from './muestra-productos-api';
import CrearProducto from './crear-producto';
import SubirGenero from "./subir-genero";
import Generos from "./generos";
import axios from 'axios';


export default class PerfilAdministrador extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productosSubidos: [],
      productoAEditar: {}
    };
    
    this.botonCerrarSesion = this.botonCerrarSesion.bind(this);
    this.guardarDatosRellenados = this.guardarDatosRellenados.bind(this);
    this.errorFormulario = this.errorFormulario.bind(this);
    this.eliminarElProducto = this.eliminarElProducto.bind(this);
    this.editarElProducto = this.editarElProducto.bind(this);
  }

  eliminarElProducto(elProducto) {
    axios.delete(`http://127.0.0.1:5000/api/productos/${elProducto.id}`).then(response => {
      this.setState({
        productosSubidos: this.state.productosSubidos.filter(item => {
          return item.id !== elProducto.id
        })
      });
      return response.data;
    }).catch(error => {
      console.log("error al eliminar", error);
    });
  }

  editarElProducto(elProducto) {
    console.log("Producto seleccionado para editar:", elProducto);
    this.setState({
      productoAEditar: elProducto
    });
  }
  

  guardarDatosRellenados(elProducto) {
    // console.log("Probando guardarDatosRellenados", elProducto);
    this.setState({
      losProductos: [elProducto].concat(this.state.losProductos)
    })
  }

  errorFormulario(error) {
    console.log("errorFormulario error", error)
  }

  botonCerrarSesion() {
    this.props.cerrarSesionAdmin2();
  }

  componentDidMount() {
    this.traerProductosDesdeApi();
  }

  traerProductosDesdeApi() {
    axios.get('http://127.0.0.1:5000/api/productos')
      .then(response => {
        this.setState({
          productosSubidos: response.data
        });
      })
      .catch(error => {
        console.log('Error al mostrar productosSubidos', error);
      });
  }
 

  render() {
    return (
      <div className="perfil-admin-wrapper">

        <div className="titulo-admin">
          <h3>Perfil de Administrador</h3>
          <button onClick={this.botonCerrarSesion} className="boton-general-x">Cerrar Sesión</button>
        </div>
        

        <div className="portfolio-manager-wrapper">

          <div className="fila-1">
            <div className="columna-izquierda">

            <CrearProducto guardarDatosRellenados={this.guardarDatosRellenados} errorFormulario={this.errorFormulario} productoAEditar={this.state.productoAEditar} />


            <SubirGenero />

            </div>

            <div className="columna-derecha">

              <Generos />
              
            </div>

          </div>

          <div className="fila-2">

            <MuestraProductosApi data={this.state.productosSubidos} eliminarElProducto={this.eliminarElProducto} editarElProducto={this.editarElProducto}/>
            
          </div>

        </div>
        
      </div>
    )
  }
}
