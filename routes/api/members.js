// Requerimos express para usar Router
const express = require('express');
// Instanciamos Router de express
const router = express.Router();
// Traemos nuestro array de usuarios
const members = require('../../Members');

// API Route para obtener los usuarios de nuestro array
router.get('/', (req, res) => {
  res.json(members); // Para retornar JSON
});

// Obtener solamente info de un usuario
router.get('/:id', (req, res) => {
  //   // ":id" es un parametro pasado por URL
  //   res.send(req.params.id); // Que aqui tomamos mediante req.params.nombreParam

  // Funcion para obtener un booleano sobre si existe o no el id
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    // si existe, traemos su info:
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
    // Traemos en JSON al usuario que cumpla con el ID pasado en la URL, mediante un filter de todos los members
  } else {
    // si no, mandamos un status 400 y un JSON con el mensaje de error
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

module.exports = router;
