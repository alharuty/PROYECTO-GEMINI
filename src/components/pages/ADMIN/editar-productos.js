import React, { Component } from 'react';
import axios from 'axios';

// CORREGIDO
export default class EditarProductos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nombre: '',
      precio: '',
      cantidadStock: '',
      color: 'Rojo',
      imagen: '',
      productos: []
    };

    this.guardarInputs = this.guardarInputs.bind(this);
    this.guardarSubida = this.guardarSubida.bind(this);
    this.guardarFormData = this.guardarFormData.bind(this);
  }

  // llamada a la API para obtener los productos existentes al cargar el componente
  componentDidMount() {
    axios
      .get('http://127.0.0.1:5000/api/modelos')
      .then((response) => {
        // console.log("response: ", response.data)
        this.setState({ productos: response.data });
      })
      .catch((error) => {
        console.error('Error al cargar los productos: ', error);
      });

    // previsualización de la imagen seleccionada
    document.getElementById('file').onchange = (e) => {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        let preview = document.getElementById('preview');
        preview.innerHTML = ''; // Limpiar previsualización anterior
        let imagen = document.createElement('img');
        imagen.src = reader.result;
        imagen.style.width = '200px';
        imagen.style.paddingTop = '20px';
        preview.append(imagen);
      };
    };
  }

  guardarFormData() {
    let formData = new FormData();

    formData.append('nombre', this.state.nombre);
    formData.append('precio', this.state.precio);
    formData.append('cantidadStock', this.state.cantidadStock);
    formData.append('color', this.state.color);

    if (this.state.imagen) {
      formData.append('imagen', this.state.imagen);
    }

    return formData;
  }

  guardarSubida(event) {
    axios
      .post('http://127.0.0.1:5000/api/joyas/upload', this.guardarFormData())
      .then((response) => {
        // console.log('response: ', response);
        this.props.guardarDatosRellenados(response.data.portfolio_item);
      })
      .catch((error) => {
        console.log('portfolio form guardarSubida error', error);
      });
  }

  guardarInputs(event) {
    const { name, value, files } = event.target;

    if (name === 'imagen' && files.length > 0) {
      this.setState({ imagen: files[0] });
    } else {
      this.setState({
        [name]: value
      });
    }
  }
  

  render() {
    return (
      <div>
        <form className="form-contenedor-subir-nuevo-modelo" onSubmit={this.guardarSubida}>
          <div className="contenedor-editor-admin">
            <div className="editor-datos-admin">
              <h3>SUBIR UN NUEVO PRODUCTO</h3>

              <div className="imagen-editor-admin">
                <input type="file" name="imagen" accept="image/png, image/jpeg, image/jpg" id="file" onChange={this.guardarInputs}/>

                <div id="preview" className="styleImage"></div>
              </div>

              <div className="input-admin">
                <select className="selector-input" name="nombre" value={this.state.nombre} onChange={this.guardarInputs} required>
                  <option value="">Selecciona un producto</option>
                  {this.state.productos.map((producto) => (
                    <option key={producto.id_nombre_modelo} value={producto.nombre_modelo}>{producto.nombre_modelo}</option>
                  ))}
                </select>
              </div>

              <div className="input-admin">
                <input type="text" name="precio" placeholder="Precio" value={this.state.precio} onChange={this.guardarInputs} required />
              </div>

              <div className="input-admin">
                <select className="selector-input" name="color" value={this.state.color} onChange={this.guardarInputs}>
                  <option value="Rojo">Rojo</option>
                  <option value="Azul">Azul</option>
                  <option value="Verde">Verde</option>
                  <option value="Negro">Negro</option>
                  <option value="Amarillo">Amarillo</option>
                  <option value="Naranja">Naranja</option>
                  <option value="Morado">Morado</option>
                  <option value="Blanco">Blanco</option>
                  <option value="Rosa">Rosa</option>
                </select>
              </div>

              <div className="input-admin">
                <input type="text" name="cantidadStock" placeholder="Cantidad stock" value={this.state.cantidadStock} onChange={this.guardarInputs} required />
              </div>
            </div>

            <div>
              <button type="submit">Guardar</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
