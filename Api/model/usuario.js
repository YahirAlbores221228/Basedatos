const mongoose = require("mongoose");
// Definicion del esquema a utilizar para la coleccion usuario
const TodoSchema = new mongoose.Schema({
Profile: {
type: File
},
  Nombre: {
    type: String,
    required: true,
  },
  Apellido: {
    type: String,
    required: true,
  },
  Contrasena: {
   type: String,
    required: true,
},
Correo: {
    type: String,
    required: true,
  },
});
// se manda a llamar la coleccion usuario
module.exports = mongoose.model("usuarios", TodoSchema);
