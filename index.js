// Traemos express
const express = require('express');
// Traemos path module de nodejs
const path = require('path');
// Traemos nuestra middleware function: logger
const logger = require('./middleware/logger');

// Init express
const app = express();

// Init middleware function declarada como logger
// // app.use(logger);
// Aqui con use disparamos nuestra middleware function logger, que sera disparada cada que un request
// llega al server

// Creamos un folder para archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));
/**
 * Haciendo uso del metodo static() del modulo express nos permite manejar archivos estaticos
 * que se encuentran dentro de la carpeta que hemos declarado como parametro con join de path,
 * manejando diferentes tipos de extensiones y archivos de manera automatica
 */

// Ruta a la API de usuarios
app.use('/api/members/', require('./routes/api/members'));

// Definimos el puerto con opcion a puerto de desarollo del deploy server
const PORT = process.env.PORT || 5000;

// Run server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
