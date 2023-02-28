const Usuario = require("../model/usuario");
// Obtener todos los objetos de usuario
const getUsuarios = async (req, res) => {
  Usuario.find((err, usuarios) => {
    if (err) {
      res.send(err);
    }
    res.json(usuarios);
  });
};
// Crear un objeto con el formato indicado de usuario
const createUsuario = async (req, res) => {
  const usuario = new Usuario({
Profile: req.body.Profile,
    Nombre: req.body.Nombre,
    Apellido: req.body.Apellido,
    Contraseña: req.body.Contraseña,
    Correo: req.body.Correo,
  });
usuario.save( async (err, usuario) => {
    if (err) {
      res.send(err);
    }
    res.json(usuario);
  });
};
// actualizar un elemento a partir del _id del usuario
const updateUsuario = async (req, res) => {
  Usuario.findOneAndUpdate(
    { _id: req.params.usuarioID },
    {
      $set: {
Profile: req.body.Profile,
      Nombre: req.body.Nombre,
      Apellido: req.body.Apellido,
      Contraseña: req.body.Contraseña,
      Correo: req.body.Correo,
      },
    },
    { new: true },
    (err, Usuario) => {
      if (err) {
        res.send(err);
      } else res.json(Usuario);
    }
  );
};
// borrar un elemento a través del _id
const deleteUsuario = async (req, res) => {
  Usuario.deleteOne({ _id: req.params.usuarioID })
    .then(() => res.json({ message: "usuario eliminado" }))
    .catch((err) => res.send(err));
};
module.exports = {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};
