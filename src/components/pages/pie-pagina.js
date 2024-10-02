import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function PiePagina() {
  return (
    <div>
        <div className="pie-pagina">

            <div className="paginas-interes">
                <a href="/#">Política de privacidad</a>
                <a href="/#">Política de Cookies</a>
                <a href="/#">Aviso legal</a>
            </div>

            <div className='servicios-contenedor'>
                <div className="servicios-iconos">
                    <FontAwesomeIcon icon="truck" />
                    <p>ENVÍO EN 48 HORAS</p>
                </div>

                <div className="servicios-iconos">
                    <FontAwesomeIcon icon="credit-card" />
                    <p>PAGOS SEGUROS</p>
                </div>

                <div className="servicios-iconos">
                    <FontAwesomeIcon icon="headset" />
                    <p>ATENCIÓN RÁPIDA</p>
                </div>
                </div>


                <div className="datos-contacto">

                <div className="contacto">
                    <FontAwesomeIcon icon="phone" />
                    <p>666 666 666</p>
                </div>

                <div className="contacto">
                    <FontAwesomeIcon icon="envelope" />
                    <p>email@email.com</p>
                </div>

                <div className="contacto">
                    <FontAwesomeIcon icon="hashtag" /> 
                    <p>Instagram</p>
                </div>
            </div>

        </div>

        <div className="copy">
            <p>© 2021 Gemini Art | by @allharuty</p>
        </div>
    </div>
  );
}

export default PiePagina;