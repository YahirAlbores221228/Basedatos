const mongoose = require("mongoose");
// Definicion del esquema a utilizar para la coleccion de menu
const MenuSchema = new mongoose.Schema({
  Nombre_del_platillo: {
    type: String,
    required: true,
  },
  Categoria: {
    type: String,
    required: true,
  },
  Precios: {
   type: Number,
    required: true,
},
Receta: {
   type: String,
    required: true,
},
});
// se manda a llamar la coleccion de menu
module.exports = mongoose.model("menus", MenuSchema);