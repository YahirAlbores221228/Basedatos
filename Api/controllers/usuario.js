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

//Validar login
const validLogin = async (req, res) => {
  try {
    let username = req.params.usuarioNOMBRE
    let password = req.params.usuarioCONTRASENA
    let datos = []
    const user = await Usuario.findOne({Nombre: req.params.usuarioNOMBRE}).exec()
    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" })
    } 
    if (username === user.Nombre) {
        console.log('if Username')
      if(password === user.Contrasena){
        console.log('if Password')
        datos.push(user._id, user.Nombre)
        console.log(username, password, datos)
        return res.status(200).send({ message: "Bienvenido" })
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


// Crear un objeto con el formato indicado de usuario
const createUsuario = async (req, res) => {

console.log(req.body); // Verificar el valor de req.body

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


module.exports = {
  getUsuarios,
  validLogin,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};
