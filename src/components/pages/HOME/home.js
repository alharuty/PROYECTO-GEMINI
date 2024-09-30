import React, { Component } from 'react';
import Bienvenida from "./bienvenida";
import ImagenArtesania from "../../../../static/assets/images/artesania.jpg"
import ImagenRegalo from "../../../../static/assets/images/regalo.jpg"
import ImagenPersonaliza from "../../../../static/assets/images/personaliza.jpg"
import FotosAleatorios from "./fotos-aleatorios"
import Productos from '../PRODUCTOS/generos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Iconos from '../../helper/iconos';

Iconos();

export default class Home extends Component{
  
  render() {
    return (
      <div className="contenedor-home">
        <Bienvenida />

        <Productos />

        <FotosAleatorios />
        
        
        <div className="mas-info-home">
          <h2>¿Por qué elegir Gemini Art?</h2>

          <div className="mas-info">

            <div className="beneficio">
              <h4>Apoyo a la artesanía local</h4>
              <img src={ImagenArtesania} />
            </div>

            <div className="beneficio">
              <h4>Regalos únicos</h4>
              <img src={ImagenRegalo} />
            </div>

            <div className="beneficio">
              <h4>Joyas personalizadas</h4>
              <img src={ImagenPersonaliza} />
            </div>
          </div>

        </div>
        
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
}
