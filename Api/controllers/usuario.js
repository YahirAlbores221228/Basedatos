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

    Nombre: req.body.Nombre,
    Apellido: req.body.Apellido,
    Contrasena: req.body.Contrasena,
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

      Nombre: req.body.Nombre,
      Apellido: req.body.Apellido,
      Contrasena: req.body.Contrasena,
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




//Validar login
const validLogin = async (req, res) => {
  try {
    let username = req.params.usuariosNombre
    let password = req.params.usuariosContrasena
    const user = await Usuario.findOne({Nombre: req.params.usuariosNombre}).exec()
    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" })
    } 
    if (username === user.Nombre) {
      if(password === user.Contrasena){
        return res.status(200).send({ message: "Has iniciado sesion 😀" })
      } else {
        return res.status(400).send({ message: "Contraseña incorrecta" })
      }
    } else {
      return res.status(400).send({ message: "Nombre de usuario incorrecto" })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).send({ error: "Error en el servidor" })
  }
};
// hasta aqui termina el validar el login
module.exports = {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
validLogin, // este es necesario para login
};
