const mongoose = require("mongoose");
const RecetaSchema = new mongoose.Schema({
  Nombre_de_receta: {
    type: String,
    required: true,
  },
  Lugar_de_origen: {
    type: String,
    required: true,
  },
  Precio: {
   type: Number,
    required: true,
},
Ingredientes: {
    type: String,
    required: true,
  },
Descripcion: {
    type: String,
    required: true,
  },
 Porcion: {
  type: Number,
    required: true,
  },
Imege: {
  type: String,
    required: true,
  },
});
module.exports = mongoose.model("recetas", RecetaSchema);
