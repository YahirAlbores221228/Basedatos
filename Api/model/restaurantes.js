const mongoose = require("mongoose");
// Definicion del esquema a utilizar para la coleccion usuario
const RestauranteSchema = new mongoose.Schema({
Profile: {
type: File
},
  Nombre: {
    type: String,
    required: true,
  },
  Tipo: {
    type: String,
    required: true,
  },
  Ubicacion: {
   type: String,
    required: true,
},
Contrasena: {
   type: String,
    required: true,
},
});
// se manda a llamar la coleccion restaurantes
module.exports = mongoose.model("restaurantes", RestauranteSchema);