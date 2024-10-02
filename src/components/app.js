import React, { Component } from 'react';
import "../style/main.scss";
import { HashRouter as Router, Route, withRouter, Redirect } from "react-router-dom";
import Home from "./pages/HOME/home";
import About from "./pages/SOBRE-MI/about";
import Pendientes from "./pages/PRODUCTOS/PENDIENTES/pendientes";
import Otros from "./pages/PRODUCTOS/OTROS/otros";
import Auth from "./pages/ADMIN/auth";
import Outlet from "./pages/PRODUCTOS/outlet";
import ComponenteNavegador from "./pages/NAVEGADOR/componente-navegador";
import PerfilAdministrador from './pages/ADMIN/perfil-administrador';
import Page404 from "./pages/page404";
import PaginaDePago from "./pages/PAGOS/pagina-de-pago";
import Productos from "./pages/PRODUCTOS/generos";
import Cuadros from "./pages/PRODUCTOS/CUADROS/cuadros";
import { CartProvider } from './pages/PAGOS/contenido-carrito';
import PagoCompletado from './pages/PAGOS/pago-completado';
import PagoCancelado from './pages/PAGOS/pago-cancelado';
import RutaProducto from './pages/PRODUCTOS/ruta-producto';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      autenticado: localStorage.getItem("loggedIn") === "LOGGED_IN"
    };

    this.autenticadoCorrectamente = this.autenticadoCorrectamente.bind(this);
    this.cerrarSesionAdmin2 = this.cerrarSesionAdmin2.bind(this);
  }

  autenticadoCorrectamente = () => {
    this.setState({
      autenticado: true
    });
    localStorage.setItem("loggedIn", "LOGGED_IN");
  }

  cerrarSesionAdmin2() {
    this.setState({
      autenticado: false
    });
    localStorage.removeItem("loggedIn");
    this.props.history.push("/");
  }

  render() {
    const { location } = this.props;
    const { autenticado } = this.state;
 
    return (
      <div className="app-wrapper">
        <Router>
          <CartProvider>
            <div className="App">
              {location.pathname !== '/auth' && location.pathname !== '/perfil-administrador' && <ComponenteNavegador />}
              
              <Route exact path="/home" component={Home} />
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/pendientes" component={Pendientes} />
              <Route path="/cuadros" component={Cuadros} />
              <Route path="/productos" component={Productos} />
              <Route path="/otros" component={Otros} />
              <Route path="/outlet" component={Outlet} />
              <Route path="/pago-completado" component={PagoCompletado} />
              <Route path="/pago-cancelado" component={PagoCancelado} />
              
              <Route path="/auth" render={(props) => (
                  autenticado ? (
                    <Redirect to="/perfil-administrador" />
                  ) : (
                    <Auth {...props} autenticadoCorrectamente={this.autenticadoCorrectamente} />
                  )
                )}
              />

              <Route 
                path="/perfil-administrador"
                render={(props) => {
                  return autenticado ? (
                    <PerfilAdministrador {...props} cerrarSesionAdmin2={this.cerrarSesionAdmin2} />
                  ) : (
                    <Redirect to="/" />
                  );
                }}
              />
              <Route path="/pago" component={PaginaDePago} />

              <Route path="/page404" component={Page404} />

              <Route path="/producto/:id" component={RutaProducto} />

            </div>
          </CartProvider>
        </Router>
      </div>
    );
  }
}

export default withRouter(App);

