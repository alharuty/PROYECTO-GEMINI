import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Iconos from "../../helper/iconos";
import { useHistory } from 'react-router-dom';


Iconos();

export const Carrito = ({ allProducts = [], setAllProducts, total, setTotal, countProducts, setCountProducts, product }) => {
  const [active, setActive] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const initialTotal = allProducts.reduce((acc, product) => acc + (product.precio * product.cantidadStock), 0);
    const initialCount = allProducts.reduce((acc, product) => acc + product.cantidadStock, 0);

    setTotal(initialTotal);
    setCountProducts(initialCount);
  }, [allProducts, setTotal, setCountProducts]);

  const onDeleteProduct = (product) => {
    const productIndex = allProducts.findIndex(item => item.id === product.id);
  
    if (productIndex !== -1 && allProducts[productIndex].cantidadStock > 1) {
      const productosActualizados = [...allProducts];
      productosActualizados[productIndex].cantidadStock -= 1;

      const newTotal = total - product.precio;
      setTotal(Math.max(0, newTotal));
  

      const newCount = countProducts - 1;
      setCountProducts(Math.max(0, newCount));
  

      setAllProducts(productosActualizados);
    }
    else {
      const results = allProducts.filter(item => item.id !== product.id);
  
      const newTotal = total - product.precio * product.cantidadStock;
      setTotal(Math.max(0, newTotal));
  
      const newCount = countProducts - product.cantidadStock;
      setCountProducts(Math.max(0, newCount));
  
      setAllProducts(results);
    }
  };
  

  const handlePayment = () => {
    history.push('/pago', { allProducts, total, product, });
  };

  return (
    <div className="carrito-de-compra">
      <div className='contenedor-icono'>
        <div className='contenedor-icono-carrito' onClick={() => setActive(!active)}>

          <FontAwesomeIcon icon="cart-shopping" className='icono-carrito' />

          <div className='container-contador-productos'>
            <span id='contador-productos'>{countProducts}</span>
          </div>
        </div>

        <div className={`contenedor-productos-carrito ${active ? "" : 'hidden-cart'}`}>
          {allProducts.length ? (
            <React.Fragment>
              <div className="productos-carrito">

                <div className="fila-productos">
                  {allProducts.map(product => (
                    <div className='producto-carrito' key={product.id}>
                      <div className='info-producto-carrito'>

                        <span className='cantidad-producto-carrito'>{product.cantidadStock}</span>
                        <p className='titulo-producto-carrito'>{product.nombre}</p>
                        <span className='precio-producto-carrito'>
                          {(product.precio * product.cantidadStock).toFixed(2)}€
                        </span>

                      </div>

                      <FontAwesomeIcon icon="xmark" className='icono-borrar' onClick={() => onDeleteProduct(product)} />
                    </div>
                  ))}
                </div>

                <div className='total-carrito'>

                  <h3>Total:</h3>
                  <span className='total-pagar'>{total.toFixed(2)}€</span>
                  
                </div>
              </div>

              <div className="botones-carrito">
                <button className='boton-ver-cesta' onClick={handlePayment}>Ver mi cesta</button>
              </div>
            </React.Fragment>
          ) : (
            <p className='carrito-vacio'>El carrito está vacío</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Carrito;
