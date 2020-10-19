// Traemos express
const express = require('express');

// Init express
const app = express();

// Creamos un route para manejar (route handler) un request GET en home (/)
// sintaxis: get('path', callback)
app.get('/', (req, res) => {
  res.send('<h1>Hello world!</h1>'); // Tomamos el objeto res y su metodo send para enviar una respuesta al browser
});

// Definimos el puerto con opcion a puerto de desarollo del deploy server
const PORT = process.env.PORT || 5000;

// Run server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
