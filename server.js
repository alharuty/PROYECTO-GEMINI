const express = require('express');
const path = require('path'); // Asegurarse de usar path para rutas seguras
const port = process.env.PORT || 8080;
const app = express();

// Sirve archivos estáticos desde el directorio 'dist'
app.use(express.static(path.join(__dirname, 'dist')));

// Redirige todas las rutas al archivo 'index.html' para que React Router maneje las rutas del lado del cliente
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
