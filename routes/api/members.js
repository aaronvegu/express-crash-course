// Requerimos express para usar Router
const express = require('express');
// Instanciamos Router de express
const router = express.Router();
// Traemos nuestro array de usuarios
const members = require('../../Members');
// UUID para crear IDs
const uuid = require('uuid');

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

// Crear un nuevo usuario
// Manejamos un request POST en la url api/members/
router.post('/', (req, res) => {
  const newMember = {
    // Creamos un nuevo objeto con el nombre e email proporcionados en el body del POST
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active',
  };

  if (!newMember.name || !newMember.email) {
    // Verifiquemos que recibamos tanto nombre como email
    return res.status(400).json({ msg: 'Please include a name and email' });
  }

  // Pusheamos el nuevo miembro creado como objeto a nuestro array de miembros
  members.push(newMember);
  // Enviamos como respuesta un JSON con los miembros del array
  res.json(members);
});

module.exports = router;
