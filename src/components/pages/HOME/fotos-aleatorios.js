import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { ContextoCarrito } from '../PAGOS/contenido-carrito';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Iconos from "../../helper/iconos";

Iconos();

// CORREGIDO
export default class FotosAleatorios extends Component {
    constructor() {
        super();

        this.state = {
            productosDeMuestra: [],
            cuatroProductosAMostrar: [],
            mostrarModal: false
        };

        this.traerProductosDeMuestra = this.traerProductosDeMuestra.bind(this);
        this.cambiarProductosAleatorios = this.cambiarProductosAleatorios.bind(this);

        // const { allProducts, total, limpiarCarrito } = useContext(ContextoCarrito); // usamos el contexto global del carrito
    }

    componentDidMount() {
        this.traerProductosDeMuestra();
    }

    componentWillUnmount() {
        if (this.intervalo) {
            clearInterval(this.intervalo);
        }
    }

    traerProductosDeMuestra() {
        axios.get("http://127.0.0.1:5000/api/joyas")
            .then(response => {
                this.setState({
                    productosDeMuestra: response.data
                }, () => {
                    this.cambiarProductosAleatorios();
                    this.intervalo = setInterval(this.cambiarProductosAleatorios, 7000);
                });
            })
            .catch(error => {
                console.log("error traerProductosDeMuestra", error);
            });
    }

    cambiarProductosAleatorios() {
        const { productosDeMuestra } = this.state;

        if (productosDeMuestra.length > 0) {
            const productosAleatorios = productosDeMuestra
                .sort(() => Math.random() - 0.5)
                .slice(0, 4);

            this.setState({
                cuatroProductosAMostrar: productosAleatorios
            });
        }
    }

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
        }, 3000);  // 3000 ms = 3 segundos
            
        
    };

    render() {
        const { mostrarModal } = this.state;
        return (
            <div className="productos-de-muestra-home">
                <div className="titulo-fotos-aleatorios">
                    <h3>NOVEDADES</h3>
                </div>
                <div className="home-productos-de-muestra">
                    {this.state.cuatroProductosAMostrar.length > 0 ? (
                        this.state.cuatroProductosAMostrar.map((producto, index) => (
                            <div className="producto-de-muestra" key={index}>
                                <img src={producto.imagen} alt={producto.nombre}></img>
                                <h4>{producto.nombre}</h4>
                                <p>{producto.color}</p>
                                <div className="contenedor-carrito-fotos-aleatorios">
                                    <div className="fotos-aleatorios-precio">
                                        <p>{producto.precio} €</p>
                                    </div>

                                    <div className="fotos-aleatorios-carrito">
                                        <button onClick={() => this.añadirAlCarrito(producto)}><FontAwesomeIcon icon="bag-shopping" className='icono-bag-shopping' /></button>
                                    </div>

                                    {/* Mostrar el overlay y el modal si el estado es true */}
                                    {mostrarModal && (
                                    <div>
                                        <div className="modal-overlay"></div>
                                        <div className="mini-modal">
                                        <p>Producto añadido al carrito</p>
                                        <a href="/pago">Ver mi cesta</a>
                                        </div>
                                    </div>
                                    )}
                                </div>
                                
                                {/* <button>Ver</button> */}
                            </div>
                        ))
                    ) : (
                        <p>No hay productos disponibles</p>
                    )}
                </div>

                <div className="cta-link-productos">
                    <NavLink to="/productos" >Ver todos los productos</NavLink>
                </div>
            </div>
            
        );
    }
}

FotosAleatorios.contextType = ContextoCarrito;