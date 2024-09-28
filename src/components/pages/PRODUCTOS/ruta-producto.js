import React, { Component } from 'react';
import axios from 'axios';
import { ContextoCarrito } from '../PAGOS/contenido-carrito';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Iconos from "../../helper/iconos";

Iconos();

export default class RutaProducto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      producto: {},
      productoId: this.props.match.params.id,
      mostrarModal: false // Para manejar el mini-modal del carrito
    };
  }

  componentDidMount() {
    this.traerProductoDesdeApi();
  }

  // Este método detectará cambios en las props, como cuando el productoId cambia
  componentDidUpdate(prevProps) {
    // Si el ID de producto cambia, traer el nuevo producto
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.setState(
        { productoId: this.props.match.params.id, producto: {} },
        this.traerProductoDesdeApi
      );
    }
  }

  traerProductoDesdeApi = () => {
    const { productoId } = this.state;
    axios
      .get(`http://127.0.0.1:5000/api/productos/${productoId}`)
      .then((response) => {
        this.setState({ producto: response.data });
      })
      .catch((error) => {
        console.log('Error al mostrar el producto', error);
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

    // Mostrar el mini-modal
    this.setState({ mostrarModal: true });

    // Ocultar el mini-modal después de 3 segundos
    setTimeout(() => {
      this.setState({ mostrarModal: false });
    }, 3000); // 3000 ms = 3 segundos
  };

  render() {
    const { producto, mostrarModal } = this.state;
    // console.log('probando: ', producto);

    return (
      <div className="contenedor-ruta-producto">
        {producto.nombre ? (
          <div className="producto-cuerpo">
            <div>
              <img src={producto.imagen} alt={producto.nombre} />
            </div>

            <div>
              <h3>{producto.nombre}</h3>
              <p>Precio: {producto.precio}€</p>
            </div>

            <div>
              <p>Descripción: {producto.descripcion}</p>
            </div>

            <div className="fotos-aleatorios-carrito">
              <button onClick={() => this.añadirAlCarrito(producto)}>
                <FontAwesomeIcon icon="bag-shopping" className="icono-bag-shopping" />
              </button>
            </div>
          </div>
        ) : (
          <p>Cargando producto...</p>
        )}

        {mostrarModal && <div className="mini-modal">¡Producto añadido al carrito!</div>}
      </div>
    );
  }
}

RutaProducto.contextType = ContextoCarrito;
