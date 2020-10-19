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

// Actualizar usuario
router.put('/:id', (req, res) => {
  // Verificamos que el usuario exista
  const found = members.some((member) => member.id === parseInt(req.params.id));

  // De existir:
  if (found) {
    // Guardamos los datos traidos del usuario desde el body del request en la var updateMember
    const updateMember = req.body;
    // Ciclamos cada usuario en object members y verificamos que encontremos el id del usuario que queremos editar
    members.forEach((member) => {
      // Una vez encontrado, aplicamos un if ternario para verificar que se haya enviado nombre e email, pues podria
      // ser que solo uno de ellos quiera modificarse y no ambos datos
      if (member.id === parseInt(req.params.id)) {
        // si updateMember existe, el nombre del usuario es reemplazado por ese, de lo contrario, se queda igual
        member.name = updateMember.name ? updateMember.name : member.name;
        // lo mismo para el email
        member.email = updateMember.email ? updateMember.email : member.email;

        res.json({ msg: 'Member updated', member });
      }
    });
  } else {
    // de no existir, mandamos un status 400 y un json con el mensaje de error
    res.status(400).json({ msg: `No member with an id of ${req.params.id}` });
  }
});

// Eliminar usuario
router.delete('/:id', (req, res) => {
  // Verificamos que el usuario exista
  const found = members.some((member) => member.id === parseInt(req.params.id));

  // De existir:
  if (found) {
    res.json({
      // Enviamos un mensaje de que el usuario ha sido eliminado
      mgs: 'Member deleted',
      // Y filtramos nuestro array de usuarios pasando aquellos que no tienen el id pasado en body del request
      members: members.filter(
        (member) => member.id !== parseInt(req.params.id)
      ),
    });
  } else {
    // de no existir, mandamos un status 400 y un json con el mensaje de error
    res.status(400).json({ msg: `No member with an id of ${req.params.id}` });
  }
});

module.exports = router;
