import React, { Component } from 'react';

// CORREGIDO
export default class Auth extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      clave: "",
      loggedIn: localStorage.getItem("loggedIn") === "LOGGED_IN" ? "LOGGED_IN" : "NOT_LOGGED",
      textoDeError: ""
    }

    this.guardarInputs = this.guardarInputs.bind(this);
    this.inicioSesionAdmin = this.inicioSesionAdmin.bind(this);
    this.cerrarSesionAdmin = this.cerrarSesionAdmin.bind(this);
  }

  guardarInputs(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  inicioSesionAdmin(event) {
    event.preventDefault();
    if (this.state.email === "email@email.com" && this.state.clave === "miclave") {
      this.setState({
        textoDeError: "",
        loggedIn: "LOGGED_IN"
      });

      localStorage.setItem("loggedIn", "LOGGED_IN");

      this.props.autenticadoCorrectamente();
      this.props.history.push("/perfil-administrador");
    } else {
      this.setState({
        textoDeError: "Email o clave incorrectos",
        email: "",
        clave: ""
      });
    }
  }

  cerrarSesionAdmin() {
    this.setState({
      loggedIn: "NOT_LOGGED",
      email: "",
      clave: ""
    });

    localStorage.removeItem("loggedIn");

    this.props.history.push("/auth");
  }

  render() {
    return (
      <div className="pagina-login">
        <div className="pagina-login-contenedor">
          <h2>LOGIN DE ADMINISTRADOR</h2>
          <div>{this.state.textoDeError}</div> 
          <div className="form-inicio-sesion-admin">
            <form className="pagina-login-form" onSubmit={this.inicioSesionAdmin}>
              <div className="pagina-login-inputs">
                <input type="text" name="email" placeholder="Tu email" value={this.state.email} onChange={this.guardarInputs}/>
                <input type="password" name="clave" placeholder="Tu clave" value={this.state.clave} onChange={this.guardarInputs}/>
              </div>
              <button type="submit">Iniciar sesión</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
