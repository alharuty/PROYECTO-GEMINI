import React, { useContext, useState } from 'react';
import { ContextoCarrito } from './contenido-carrito';

// CORREGIR NOMBRES DE VARIABLES
const PaginaDePago = () => {
    
  const { allProducts, total, limpiarCarrito } = useContext(ContextoCarrito);
  const [cliente, setCliente] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    tipoVia: '',
    nombreCalle: '',
    numeroCalle: '',
    pisoPuerta: '',
    codigoPostal: '',
    ciudad: '',
    provincia: '',
    pais: 'España',
  });
  const [isLoading, setIsLoading] = useState(false);

  const carritoVacio = allProducts.length === 0;

  const guardarInputs = (e) => {
    const { name, value } = e.target;
    setCliente(prev => ({ ...prev, [name]: value }));
  };

  const validarFormulario = () => {
    const { nombre, apellidos, email, telefono, tipoVia, nombreCalle, numeroCalle, pisoPuerta, codigoPostal, ciudad, provincia, pais } = cliente;

    if (!nombre || !apellidos || !email || !telefono ||  !tipoVia || !nombreCalle || !numeroCalle || !pisoPuerta || !codigoPostal || !ciudad || !provincia || !pais) {
      alert('Por favor, rellena todos los campos.');
      return false;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      alert("Por favor, introduce un correo electrónico válido.");
      return false;
    }

    const postalCodeRegex = /^\d{5}$/;
    if (!postalCodeRegex.test(codigoPostal)) {
      alert("Por favor, introduce un código postal válido.");
      return false;
    }

    const telefonoRegex = /^\d{9}$/;
    if (!telefonoRegex.test(telefono)) {
        alert("Por favor, introduce un número de teléfono válido.");
        return false;
    }

    return true;
  };

  const terminarPago = async () => {
    if (!validarFormulario()) return;
  
    setIsLoading(true);
  
    try {
      const response = await fetch("https://gemini-art-api-947794bf0d42.herokuapp.com/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: allProducts, cliente }),
      });
  
      if (!response.ok) {
        console.error("Error en la respuesta del servidor", response.status);
        return;
      }
  
      const data = await response.json();
      limpiarCarrito();
      window.location.href = data.url;
    } catch (error) {
      console.error("Error de terminarPago:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="cesta">
        <h1>MI CESTA</h1>
        
        <div className="cesta-y-pago">

            <div className="info-cliente">
                <h3>PASO 1: Rellena tus datos</h3>
                <form className="reellenar-datos-para-envio">

                    <div className="columna-fila">
                        <div className="input-wrapper">
                            <input type="text" className="inputs-formularios" id="nombre" name="nombre" placeholder="Nombre" value={cliente.nombre} onChange={guardarInputs} required />
                        </div>
                        <div className="input-wrapper">
                            <input type="text" className="inputs-formularios" id="apellidos" name="apellidos" placeholder="Apellidos" value={cliente.apellidos} onChange={guardarInputs} required />
                        </div>
                    </div>
                    
                    <div className="columna-fila">
                        <div className="input-wrapper">
                            <input type="text" className="inputs-formularios" id="email" name="email" placeholder="Email de contacto" value={cliente.email} onChange={guardarInputs} required />
                        </div>
                        <div className="input-wrapper">
                            <input type="text" className="inputs-formularios" id="telefono" name="telefono" placeholder="Teléfono de contacto" value={cliente.telefono} onChange={guardarInputs} required />
                        </div>
                    </div>

                    <div className="columna-fila">
                        <div  className="input-wrapper">
                            <select id="tipo-via" name="tipoVia" value={cliente.tipoVia} onChange={guardarInputs} required>
                                <option value="" disabled className="inputs-formularios" >Vía</option>
                                <option value="Calle">Calle</option>
                                <option value="Avenida">Avenida</option>
                                <option value="Boulevard">Boulevard</option>
                                <option value="Plaza">Plaza</option>
                                <option value="Ruta">Ruta</option>
                                <option value="Camino">Camino</option>
                                <option value="Sendero">Sendero</option>
                            </select>
                        </div>
                        <div className="input-wrapper">
                            <input type="text" className="inputs-formularios" id="nombre-calle" name="nombreCalle" placeholder="Dirección" value={cliente.nombreCalle} onChange={guardarInputs} required />
                        </div>
                    </div>

                    <div className="columna-fila">
                        <div className="input-wrapper">
                            <input type="text" className="inputs-formularios" id="numero-calle" name="numeroCalle" placeholder="Número" value={cliente.numeroCalle} onChange={guardarInputs} required />
                        </div>
                        <div className="input-wrapper">
                            <input type="text" className="inputs-formularios" id="piso-puerta" name="pisoPuerta" placeholder="Piso y puerta" value={cliente.pisoPuerta} onChange={guardarInputs} required />
                        </div>
                    </div>

                    <div className="columna-fila">
                        <div className="input-wrapper">
                            <input type="text" className="inputs-formularios" id="codigo-postal" name="codigoPostal" placeholder="Código Postal" value={cliente.codigoPostal} onChange={guardarInputs} required />
                        </div>
                        <div className="input-wrapper">
                            <input type="text" className="inputs-formularios" id="ciudad" name="ciudad" placeholder="Ciudad" value={cliente.ciudad} onChange={guardarInputs} required />
                        </div>
                    </div>
        
                    <div className="columna-fila">
                        <div className="input-wrapper">
                            <input type="text" className="inputs-formularios" id="provincia" name="provincia" placeholder="Provincia" value={cliente.provincia} onChange={guardarInputs} required />
                        </div>
                        <div className="input-wrapper">
                            <select id="pais" name="pais" value={cliente.pais} onChange={guardarInputs} required>
                                <option value="España"  className="inputs-formularios">España</option>
                                <option value="Otros">Otros (No permitido)</option>
                            </select>
                        </div>
                    </div>

                </form> 
            </div>

            <div className="contenido-cesta">
                <div>
                    <h3>PASO 2: Revisa tu cesta</h3>
                </div>
                {carritoVacio ? (
                    <p>El carrito está vacío.</p>
                ) : (
                <ul>
                    {allProducts.map(product => (
                        <li key={product.id} className="producto-cesta">
                            <div className="nombre-cantidad-precio">

                                <div className="nombre-producto-cesta">
                                    {product.nombre}
                                </div>

                                <div className="cantidad-precio-cesta">
                                    <div>
                                        {product.cantidadStock > 1 ? product.cantidadStock + ' unidades' + ' x ' + product.precio + ' €' : product.cantidadStock + ' unidad'}
                                    </div>

                                    <div className="precio-subtotal-cesta">
                                        <p>{product.precio * product.cantidadStock} € </p>
                                    </div>
                                    
                                </div>

                            </div>
                        
                            <div>
                                <img src={product.imagen} alt={product.nombre} className="imagen-en-pago"/>
                            </div> 
                        </li>
                    ))}
                </ul>
                )}
                <h3>Envío GRATUÍTO durante el mes de Octubre</h3>
                <h2>Total a pagar: {total.toFixed(2)}€</h2>
            </div>

            <div className="contenido-cesta">

                <div>
                    <h3>PASO 3: Procede al pago</h3>
                </div>

                <div className='botones-pago'>
                    <div className="botones-pago-pagina-pago">
                    {!carritoVacio ? (
                        <button type="button" className="boton-general" onClick={terminarPago} disabled={isLoading} > {isLoading ? 'Procesando...' : 'Pagar'} </button>
                    ) : (
                        <button type="button" className="boton-general-x" disabled>Carrito vacío</button>
                    )}
                    </div>
                </div>
            </div>
                
        </div>
    </div>
);
};

export default PaginaDePago;