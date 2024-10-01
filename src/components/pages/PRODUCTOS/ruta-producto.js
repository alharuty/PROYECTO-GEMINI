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
      mostrarModal: false,
      cantidad: 1
    };
  }

  componentDidMount() {
    this.traerProductoDesdeApi();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.setState(
        { productoId: this.props.match.params.id, producto: {}, cantidad: 1 },
      );
    }
  }

  traerProductoDesdeApi = () => {
    const { productoId } = this.state;
    axios
      .get(`https://gemini-art-api-947794bf0d42.herokuapp.com/api/productos/${productoId}`)
      .then((response) => {
        this.setState({ producto: response.data });
      })
      .catch((error) => {
        console.log('Error al mostrar el producto', error);
      });
  };

  manejarCambioCantidad = (event) => {
    const nuevaCantidad = Math.max(1, event.target.value);
    this.setState({ cantidad: nuevaCantidad });
  };

  añadirAlCarrito = (product) => {
    const { allProducts, setAllProducts, total, setTotal, countProducts, setCountProducts } = this.context;
    const productoYaEstaEnCarrito = allProducts.find(item => item.id === product.id);

    if (product.descuento === 1) {
      product.precio = product.precio - (product.precio * (product.porcentajeDescuento / 100));
      product.descuento = 0;
    }

    if (productoYaEstaEnCarrito) {
      const productosActualizados = allProducts.map(item =>
        item.id === product.id
          ? { ...item, cantidadStock: item.cantidadStock + this.state.cantidad }
          : item
      );
      setAllProducts(productosActualizados);
    } else {
      setAllProducts([...allProducts, { ...product, cantidadStock: this.state.cantidad }]);
    }

    setTotal(total + (product.precio * this.state.cantidad));
    setCountProducts(countProducts + this.state.cantidad);

    this.setState({ mostrarModal: true });

    setTimeout(() => {
      this.setState({ mostrarModal: false });
    }, 3000);
  };
  
  render() {
    const { producto, mostrarModal, cantidad } = this.state;

    return (
      <div className="contenedor-ruta-producto">
        {producto.nombre ? (
          <div className="producto-cuerpo">
            <div className="zoom-contenedor">
              <img src={producto.imagen} alt={producto.nombre} />
            </div>

            <div className="datos-del-producto">
              <div className="ruta-producto-info">
                <div className="ruta-nombre">
                  <h3>{producto.nombre}</h3>
                </div>

                <div className="ruta-precio">
                  <div className="precio">
                      {producto.descuento === 1 ? (
                        <p>
                          <span className="precio-sin-descuento">
                            {producto.precio}€
                          </span>
                          &nbsp;
                          <span className="precio-con-descuento">
                            {(
                              producto.precio - (producto.precio * (producto.porcentajeDescuento / 100))
                            ).toFixed(2)}€
                          </span>
                        </p>
                      ) : (
                        <span>{producto.precio}€</span>
                      )}
                  </div>
                  <p>IVA incl.</p>
                </div>
              </div>

              <div className="ruta-descripcion">
                <p>{producto.descripcion}</p>
              </div>

              <div className="ruta-genero">
                <p>Familia: {producto.genero}</p>
              </div>

              <div className="ruta-cantidad-y-carrito">
                <div className="ruta-cantidad">
                  <div><p>Cantidad:</p></div>
                  <div><input type="number" id="cantidad" value={cantidad} min="1" max="5" onChange={this.manejarCambioCantidad}/></div>
                </div>

                <div className="fotos-aleatorios-carrito">
                  <button onClick={() => this.añadirAlCarrito(producto)}>
                    <FontAwesomeIcon icon="bag-shopping" className="icono-bag-shopping" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        ) : (
          <p>Cargando producto...</p>
        )}

        {mostrarModal && (
          <div className="modal-añadido-al-carrito">
            <div className="modal-overlay"></div>
            <div className="mini-modal">
              <p>Producto añadido al carrito</p>
              <a href="/pago">Ver mi cesta</a>
              <button className="boton-modal-cerrar" onClick={() => this.setState({ mostrarModal: false })}>
                Seguir comprando
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

RutaProducto.contextType = ContextoCarrito;
