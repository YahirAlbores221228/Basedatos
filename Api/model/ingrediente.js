const mongoose = require("mongoose");
// Definicion del esquema a utilizar para la coleccion ingredientes
const IngredienteSchema = new mongoose.Schema({
  Costo: {
    type: Number,
    required: true,
  },
  Descripcion: {
    type: String,
    required: true,
  },
  Cantidad: {
   type: Number,
    required: true,
},
});
// se manda a llamar la coleccion de ingredientes
module.exports = mongoose.model("ingredientes", IngredienteSchema);