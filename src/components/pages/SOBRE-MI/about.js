import React, { Component } from 'react';
import ImagenYo from "../../../../static/assets/images/Imagen-Yo.jpg"

// CORREGIDO
export default class About extends Component{
  render() {
    return (
      <div className="about">

        <div className="contenedor-imagen">
          
          <div className="imagen-redondeada">
            <img src={ImagenYo} />
          </div>

          <div className="texto-biografia">

            <div>
              <h1>Me llamo Teresa y soy la creadora de Gemini Art.</h1>
            </div>

            <div className='texto-bio-contenedor'>
              <p>Siempre he tenido un alma creativa y curiosa así que hace un año, decidí adentrarme en el mundo de la resina,
                donde he estado creando joyas, platos, vasos y otros objetos únicos. Este nuevo hoby me ha permitido combinar colores
                y texturas de maneras fascinantes, mientras aprendo sobre paciencia y perseverancia.</p>
              <p>Cada día es una oportunidad para seguir creciendo y explorando mi pasión por la artesanía.</p>
            
            </div>
            
          </div>

        </div>    
      </div>
    );
  }
}
