const mongoose = require("mongoose");
// Definicion del esquema a utilizar para la coleccion de categoria
const CategoriaSchema = new mongoose.Schema({
  Por_precio: {
    type: String,
    required: true,
  },
  Ingredientes_disponible: {
    type: String,
    required: true,
  },
});
// se manda a llamar la coleccion de categoria
module.exports = mongoose.model("categorias", CategoriaSchema);