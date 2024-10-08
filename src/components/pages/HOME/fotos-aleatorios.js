import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { ContextoCarrito } from '../PAGOS/contenido-carrito';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Iconos from "../../helper/iconos";
import { Link } from 'react-router-dom';

Iconos();

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
        axios.get("https://gemini-art-api-947794bf0d42.herokuapp.com/api/productos")
            .then(response => {
                this.setState({
                    productosDeMuestra: response.data
                }, () => {
                    this.cambiarProductosAleatorios();
                    this.intervalo = setInterval(this.cambiarProductosAleatorios, 10000);
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
                                <Link to={`/producto/${producto.id}`} className="imagen-producto-muestra"><img src={producto.imagen} alt={producto.nombre}></img></Link>
                                <h4>{producto.nombre}</h4>
                                <p>{producto.color}</p>
                                <div className="contenedor-carrito-fotos-aleatorios">
                                    <div className="fotos-aleatorios-precio">
                                        <div className="precio">
                                            {producto.descuento === 1 ? (
                                            <p className="precio-con-descuento">
                                                <span className="precio-sin-descuento">
                                                {producto.precio}€
                                                </span>
                                                &nbsp;
                                                <span>
                                                {(
                                                    producto.precio - (producto.precio * (producto.porcentajeDescuento / 100))
                                                ).toFixed(2)}€
                                                </span>
                                            </p>
                                            ) : (
                                            <span>{producto.precio}€</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="fotos-aleatorios-carrito">
                                        <button onClick={() => this.añadirAlCarrito(producto)}><FontAwesomeIcon icon="bag-shopping" className='icono-bag-shopping' /></button>
                                    </div>

                                    {mostrarModal && (
                                    <div className="modal-añadido-al-carrito">
                                        <div className="modal-overlay"></div>
                                            <div className="mini-modal">
                                            <p>Producto añadido al carrito</p>
                                            <Link to="/pago">Ver mi cesta</Link>
                                            <button className="boton-modal-cerrar" onClick={() => this.setState({ mostrarModal: false })}>Seguir comprando</button>
                                        </div>
                                    </div>
                                    )}
                                </div>
                                
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