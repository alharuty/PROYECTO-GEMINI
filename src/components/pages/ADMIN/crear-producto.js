import React, { Component } from 'react';
import axios from 'axios';

export default class CrearProducto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nombre: "",
      precio: "",
      imagen: null,
      cantidadStock: "",
      color: 'Rojo',
      descripcion: "",
      material: "",
      descuento: "0",
      porcentajeDescuento: "0",
      genero: "",
      productos: []
    };

    this.guardarInputs = this.guardarInputs.bind(this);
    this.guardarSubida = this.guardarSubida.bind(this);
  }

  componentDidMount() {
    axios
      .get('http://127.0.0.1:5000/api/generos')
      .then((response) => {
        this.setState({ productos: response.data });
      })
      .catch((error) => {
        console.error('Error al cargar los productos: ', error);
      });

    this.fileInput = document.getElementById('file');
    this.fileInput.onchange = (e) => {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        let preview = document.getElementById('preview');
        preview.innerHTML = '';
        let imagen = document.createElement('img');
        imagen.src = reader.result;
        imagen.style.width = '200px';
        imagen.style.paddingTop = '20px';
        preview.append(imagen);
      };
    };

  }

  componentDidUpdate(prevProps) {
    if (prevProps.productoAEditar !== this.props.productoAEditar && this.props.productoAEditar) {
      const productoAEditar = this.props.productoAEditar;

      this.setState({
        nombre: productoAEditar.nombre,
        precio: productoAEditar.precio,
        cantidadStock: productoAEditar.cantidadStock,
        color: productoAEditar.color,
        descripcion: productoAEditar.descripcion,
        material: productoAEditar.material,
        descuento: productoAEditar.descuento,
        porcentajeDescuento: productoAEditar.porcentajeDescuento,
        genero: productoAEditar.genero
      });
    }
  }
  
  guardarSubida(event) {

    const { productoAEditar } = this.props;
    const url = productoAEditar && productoAEditar.id 
        ? `http://127.0.0.1:5000/api/productos/${productoAEditar.id}/edit`
        : 'http://127.0.0.1:5000/api/productos/upload';

    const method = productoAEditar && productoAEditar.id ? 'put' : 'post';

    const formData = new FormData();
    formData.append('nombre', this.state.nombre);
    formData.append('precio', parseFloat(this.state.precio));
    formData.append('cantidadStock', parseInt(this.state.cantidadStock, 10));
    formData.append('color', this.state.color);
    formData.append('descripcion', this.state.descripcion);
    formData.append('material', this.state.material);
    formData.append('descuento', this.state.descuento);
    formData.append('porcentajeDescuento', parseFloat(this.state.porcentajeDescuento));
    formData.append('genero', this.state.genero);

    if (this.state.imagen) {
        formData.append('imagen', this.state.imagen);
    }

    axios({
        method,
        url,
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then((response) => {
        this.props.guardarDatosRellenados(response.data.portfolio_item);
        this.setState({
            nombre: "",
            precio: "",
            imagen: null,
            cantidadStock: "",
            color: 'Rojo',
            descripcion: "",
            material: "",
            descuento: "0",
            porcentajeDescuento: "0",
            genero: ""
        });
    })
    .catch((error) => {
        console.log('Error al guardar el producto', error);
        alert("Error al guardar el producto. Intenta de nuevo.");
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
                <input type="file" name="imagen" accept="image/png, image/jpeg, image/jpg" id="file" onChange={this.guardarInputs} />

                <div id="preview" className="styleImage"></div>
              </div>

              <div className="input-admin">
                <input type="text" name="nombre" placeholder="Nombre del producto" value={this.state.nombre} onChange={this.guardarInputs} required />
              </div>

              <div className="input-admin">
                <input type="number" name="precio" placeholder="Precio" value={this.state.precio} onChange={this.guardarInputs} required />
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
                <input type="number" name="cantidadStock" placeholder="Cantidad stock" value={this.state.cantidadStock} onChange={this.guardarInputs} required />
              </div>

              <div className="input-admin">
                <input type="text" name="descripcion" placeholder="Descripcion del producto" value={this.state.descripcion} onChange={this.guardarInputs} />
              </div>

              <div className="input-admin">
                <input type="text" name="material" placeholder="Material del producto" value={this.state.material} onChange={this.guardarInputs} required />
              </div>

              <div className="input-admin">
                <input type="text" name="descuento" placeholder="Descuento = 1, No Descuento = 0" value={this.state.descuento} onChange={this.guardarInputs} />
              </div>

              <div className="input-admin">
                <input type="number" name="porcentajeDescuento" placeholder="si hay descuento, pon la cantidad (ej: 20)" value={this.state.porcentajeDescuento} onChange={this.guardarInputs} />
              </div>

              <div className="input-admin">
                <select className="selector-input" name="genero" value={this.state.genero} onChange={this.guardarInputs} required>
                  <option value="">Selecciona el género</option>
                  {this.state.productos.map((producto) => (
                    <option key={producto.id} value={producto.nombre_genero.toLowerCase()}>{producto.nombre_genero}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <button type="submit" className="boton-general">Guardar</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
