import React, { Component } from 'react';
import ImagenOrquidea from "../../../../static/assets/images/Orquidea.jpg";

// CORREGIDO
export default class Bienvenida extends Component{
  render() {
    return (
      <div className="imagen-bienvenida-home">
        <img src={ImagenOrquidea} alt="Orquidea Home" width="30%"/>
        <div className="texto-bienvenida">
            <h3 id="mi-titulo">¡ BIENVENIDO A GEMINI ART, TU ESPACIO PARA DESCUBRIR JOYERÍA ARTESANAL ÚNICA Y EXCLUSIVA !</h3>
            <p>Cada una de nuestras piezas es creada a mano con dedicación y pasión, lo que hace que no existan dos iguales. Aquí, cada joya cuenta su propia historia,
              siendo una obra irrepetible y diseñada para destacar la autenticidad de quien la lleva.
            </p>
        </div>
      </div>
    );
  }
}
