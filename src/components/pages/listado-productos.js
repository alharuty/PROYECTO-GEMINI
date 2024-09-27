import React, { Component, useContext } from 'react';
import axios from 'axios';
// import Modal from "./modal";
// import ReactModal from 'react-modal';
import { ContextoCarrito } from './PAGOS/contenido-carrito';
import { Paginacion } from './paginacion';

// CORREGIR NOMBRES DE VARIABLES
class ListadoProductos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productosSubidos: [],
      mostrarModal: false,
      productosPorPagina: 10,
      paginaActual: 1,
      totalProductos: 0,
    };

    // this.abrirModal = this.abrirModal.bind(this);
    // this.cerrarModal = this.cerrarModal.bind(this);
    this.actualizarPaginaActual = this.actualizarPaginaActual.bind(this);

  }

  actualizarPaginaActual(page) {
    this.setState({ paginaActual: page });
  }

  // abrirModal() {
  //   this.setState({ mostrarModal: true });
  // }

  // cerrarModal() {
  //   this.setState({ mostrarModal: false });
  // }

  componentDidMount() {
    this.traerProductosDesdeApi();
  }

  traerProductosDesdeApi = () => {
    axios.get('http://127.0.0.1:5000/api/joyas')
      .then(response => {
        this.setState({ productosSubidos: response.data });
      })
      .catch(error => {
        console.log('Error al mostrar productosSubidos', error);
      });
  };

  añadirAlCarrito = (product) => {
    const { allProducts, setAllProducts, total, setTotal, countProducts, setCountProducts } = this.context;
    const productoYaEstaEnCarrito = allProducts.find(item => item.id === product.id);

    if (productoYaEstaEnCarrito) {
      const productosActualizados = allProducts.map(item =>
        item.id === product.id
          ? { ...item, cantidadStock: item.cantidadStock + 1 }
          : item
      );
      setAllProducts(productosActualizados);
    } else {
      setAllProducts([...allProducts, { ...product, cantidadStock: 1 }]);
    }

    setTotal(total + product.precio);
    setCountProducts(countProducts + 1);
  };

  render() {
    const { productosSubidos, productosPorPagina, paginaActual } = this.state;

    const ultimoIndex = paginaActual * productosPorPagina;
    const primerIndex = ultimoIndex - productosPorPagina;
    const productosActuales = productosSubidos.slice(primerIndex, ultimoIndex);

    return (
      <div>
        <div className="contenedor-productos-api">
        {productosSubidos.length > 0 ? productosActuales.map(product => (
          <div key={product.id} className="contenedor-stock">
            <div className="item">
              <img src={product.imagen} alt={product.nombre} />
              <div className="info-producto">
                <h3>{product.nombre}</h3>
                <p className="precio">Precio: {product.precio}€</p>
                {/* <button className="boton-personalizar" onClick={this.abrirModal}>Personalizar</button>
                <ReactModal isOpen={this.state.mostrarModal} contentLabel="Hello world" ariaHideApp={false}>
                  <h1>PERSONALIZA TU PRODUCTO</h1>
                  <p>Nombre del producto: {product.nombre}</p>
                  <button onClick={this.cerrarModal}>Close Modal</button>
                </ReactModal> */}
                <button onClick={() => this.añadirAlCarrito(product)}>
                  Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        )) : <div>No hay productos disponibles</div>
      }

        
      </div>
        <Paginacion productosPorPagina={productosPorPagina} totalProductos={productosSubidos.length} paginaActual={paginaActual} actualizarPaginaActual={this.actualizarPaginaActual} />
      </div>
      
    );
  }
}

ListadoProductos.contextType = ContextoCarrito;

export default ListadoProductos;
