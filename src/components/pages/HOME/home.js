import React, { Component } from 'react';
import Bienvenida from "./bienvenida";
import ImagenArtesania from "../../../../static/assets/images/artesania.jpg"
import ImagenRegalo from "../../../../static/assets/images/regalo.jpg"
import ImagenPersonaliza from "../../../../static/assets/images/personaliza.jpg"
import FotosAleatorios from "./fotos-aleatorios"
import Productos from '../PRODUCTOS/generos';
import Iconos from '../../helper/iconos';
import PiePagina from '../pie-pagina';

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
        
        <PiePagina />
        
      </div>
    );
  }
}
