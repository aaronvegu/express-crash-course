// Traemos express
const express = require('express');
// Traemos path module de nodejs
const path = require('path');
// Treamos Express-handlebars para manejar templates
const exphbs = require('express-handlebars');
// Traemos nuestra middleware function: logger
const logger = require('./middleware/logger');
// Traemos nuestro arreglo de usuarios
const members = require('./Members');

// Init express
const app = express();

// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body Parser Middleware. Para poder recibir datos json y encoded data mediante POST request
app.use(express.json()); // Para manejar json
app.use(express.urlencoded({ extended: false })); // para manejar formularios o url encoded data

// Homepage
app.get('/', (req, res) =>
  res.render('index', {
    title: 'Member App',
    members,
  })
);

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
