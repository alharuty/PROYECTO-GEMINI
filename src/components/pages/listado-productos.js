import React, { Component } from 'react';
import axios from 'axios';
import { ContextoCarrito } from './PAGOS/contenido-carrito';
import { Paginacion } from './paginacion';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Iconos from "../helper/iconos";
import { Link } from 'react-router-dom';

Iconos();

class ListadoProductos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productosSubidos: [],
      productosPorPagina: 10,
      paginaActual: 1,
      totalProductos: 0,
      mostrarModal: false
    };

    this.actualizarPaginaActual = this.actualizarPaginaActual.bind(this);
  }

  actualizarPaginaActual(page) {
    this.setState({ paginaActual: page });
  }

  componentDidMount() {
    this.traerProductosDesdeApi();
  }

  traerProductosDesdeApi = () => {
    axios.get(`https://gemini-art-api-947794bf0d42.herokuapp.com/api/productos`)
      .then(response => {

        const productosFiltrados = this.props.propGenero 
          ? response.data.filter(product => product.genero === this.props.propGenero) 
          : response.data;
  
        const productosFinales = this.props.propOutlet === '1'
          ? productosFiltrados.filter(product => product.descuento === 1)
          : productosFiltrados;
  
        this.setState({ productosSubidos: productosFinales });
      })
      .catch(error => {
        console.log('Error al mostrar productosSubidos', error);
      });
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
          ? { ...item, cantidadStock: item.cantidadStock + 1 }
          : item
      );
      setAllProducts(productosActualizados);
    } else {
      setAllProducts([...allProducts, { ...product, cantidadStock: 1 }]);
    }

    setTotal(total + product.precio);
    setCountProducts(countProducts + 1);

    this.setState({ mostrarModal: true });

    setTimeout(() => {
        this.setState({ mostrarModal: false });
    }, 3000);
  };

  render() {
    const { productosSubidos, productosPorPagina, paginaActual } = this.state;

    const ultimoIndex = paginaActual * productosPorPagina;
    const primerIndex = ultimoIndex - productosPorPagina;
    const productosActuales = productosSubidos.slice(primerIndex, ultimoIndex);

    const { mostrarModal } = this.state;

    return (
      <div>
        <div className="contenedor-productos-api">
          {productosSubidos.length > 0 ? productosActuales.map(product => (
            <div key={product.id} className="contenedor-stock">
              <div className="item">
                <Link to={`/producto/${product.id}`}><img src={product.imagen} alt={product.nombre} /></Link>
                <div className="info-producto">
                  <h3>{product.nombre}</h3>

                  <div className="precio">
                    {product.descuento === 1 ? (
                      <p>
                        <span className="precio-sin-descuento">
                          {product.precio}€
                        </span>
                        &nbsp;
                        <span>
                          {(
                            product.precio - (product.precio * (product.porcentajeDescuento / 100))
                          ).toFixed(2)}€
                        </span>
                      </p>
                    ) : (
                      <span>{product.precio}€</span>
                    )}
                  </div>

                  <button onClick={() => this.añadirAlCarrito(product)}>
                    <FontAwesomeIcon icon="bag-shopping" className='icono-bag-shopping' />
                  </button>
                  

                  <Link to={`/producto/${product.id}`} className="boton-ver-mas">Ver más</Link>


                </div>

                {mostrarModal && (
                  <div className="modal-añadido-al-carrito">
                    <div className="modal-overlay"></div>
                    <div className="mini-modal">
                      <p>Producto añadido al carrito</p>
                      <Link to="/pago">Ver mi cesta</Link>
                      <button className="boton-modal-cerrar" onClick={() => this.setState({ mostrarModal: false })}>
                        Seguir comprando
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )) : <div>No hay productos disponibles</div>}
        </div>
        <Paginacion productosPorPagina={productosPorPagina} totalProductos={productosSubidos.length} paginaActual={paginaActual} actualizarPaginaActual={this.actualizarPaginaActual} />
      </div>
    );
  }
}

ListadoProductos.contextType = ContextoCarrito;

export default withRouter(ListadoProductos);
