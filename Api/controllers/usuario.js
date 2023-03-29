
const Usuario = require("../model/usuario");
const jwt = require("jsonwebtoken");
const AWS = require('aws-sdk');
require("dotenv").config();
//mandada de mensajaes

 const sns = new AWS.SNS({
  profile: 'receita',
  accessKeyId: 'AKIA4IDAIOVAOIXBXOOW',
  secretAccessKey: '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',
  region: 'us-east-1',
});    

let params = {
        Protocol: 'EMAIL', 
        TopicArn: 'reemplaza-arn',
        Endpoint: req.body.email
    };

// Obtener todos los objetos de usuario
const getUsuarios = async (req, res) => {
jwt.verify(req.token,'ReceitaSeguro', (error, authData) =>{
  Usuario.find((err, usuarios) => {
    if (err) {
      res.send(err);
    }
    res.json(usuarios);
  });
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
const token = jwt.sign({id: user._id}, process.env.AWS_SECRET_KEY, {
          expiresIn: 60 * 60
        })

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
 const token = jwt.sign({id: usuario._id}, process.env.AWS_SECRET_KEY, {
      expiresIn: 60 * 60
    })
//envia los gmail

 let now = new Date().toString();
   let email = `Nuevo usuario registrado \n \n Enviado: ${now}`;
    let params = {
         Message: email,
         TopicArn: 'arn:aws:sns:us-east-1:842015470912:receita'
    };

   sns.publish(params, function(err, data) {
      if (err) console.log(err, err.stack); 
       else console.log(data);
     });

    res.json({auth: true, token});
  });
};


// actualizar un elemento a partir del _id del usuario
const updateUsuario = async (req, res) => {
jwt.verify(req.token, 'ReceitaSeguro', (error, authData) => {
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
 });
};
// borrar un elemento a través del _id
const deleteUsuario = async (req, res) => {
jwt.verify(req.token, 'ReceitaSeguro', (error, authData) => {
  Usuario.deleteOne({ _id: req.params.usuarioID })
    .then(() => res.json({ message: "usuario eliminado" }))
    .catch((err) => res.send(err));
 });
};


module.exports = {
  getUsuarios,
  validLogin,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};
