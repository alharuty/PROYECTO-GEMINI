import React from 'react';

// CORREGIDO
export const Paginacion = ({ productosPorPagina, totalProductos, paginaActual, actualizarPaginaActual }) => {
  const numeroDePaginas = [];

  for (let i = 1; i <= Math.ceil(totalProductos / productosPorPagina); i++) {
    numeroDePaginas.push(i);
  }

  const paginaAnterior = () => {
    if (paginaActual > 1) {
      actualizarPaginaActual(paginaActual - 1);
    }
  };

  const siguientePagina = () => {
    if (paginaActual < numeroDePaginas.length) {
      actualizarPaginaActual(paginaActual + 1);
    }
  };

  return (
    <div>
      <nav className="paginacion" role="navigation" aria-label="pagination">
        <a className="paginacion-moverse" onClick={paginaAnterior} disabled={paginaActual === 1}>Anterior</a>
        
        <ul className="lista-paginacion">
          {numeroDePaginas.map((number) => (
            <li key={number}>
              <a href="#" className={`${number === paginaActual ? 'pagina-actual' : ''}`} onClick={() => actualizarPaginaActual(number)}>{number}</a>
            </li>
          ))}
        </ul>

        <a className="paginacion-moverse" onClick={siguientePagina} disabled={paginaActual === numeroDePaginas.length}>Siguiente</a>
      </nav>
    </div>
  );
};
