// Traemos modulo moment para obtener tiempo y hora
const moment = require('moment');

// Middleware function creation
const logger = (req, res, next) => {
  console.log(
    `${req.protocol}://${req.get('host')}${
      req.originalUrl
    }: ${moment().format()}`
  ); // Traemos la url que es disparada
  next();
};

module.exports = logger;
