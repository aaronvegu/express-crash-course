// Traemos express
const express = require('express');
// Traemos path module de nodejs
const path = require('path');

// Init express
const app = express();

// Creamos un route para manejar (route handler) un request GET en home (/)
// sintaxis: get('path', callback)
app.get('/', (req, res) => {
  // Enviando archivos como respuesta al browser
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Definimos el puerto con opcion a puerto de desarollo del deploy server
const PORT = process.env.PORT || 5000;

// Run server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
