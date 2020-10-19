// Traemos express
const express = require('express');
// Traemos path module de nodejs
const path = require('path');

// Init express
const app = express();

// Creamos un folder para archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));
/**
 * Haciendo uso del metodo static() del modulo express nos permite manejar archivos estaticos
 * que se encuentran dentro de la carpeta que hemos declarado como parametro con join de path,
 * manejando diferentes tipos de extensiones y archivos de manera automatica
 */

// Definimos el puerto con opcion a puerto de desarollo del deploy server
const PORT = process.env.PORT || 5000;

// Run server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
