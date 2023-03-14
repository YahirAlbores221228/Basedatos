// definicion de rutas
// para recetas
const {
  getRecetas,
createReceta,
updateReceta,
deleteReceta,
} = require("./controllers/receta");
//para usuario
const {
  getUsuarios,
  createUsuario,
  validLogin,
  updateUsuario,
  deleteUsuario,
} = require("./controllers/usuario");

//para ingredientes
const {
  getIngredientes,
  createIngrediente,
  updateIngrediente,
  deleteIngrediente,
} = require("./controllers/ingrediente");
//para restaurante
const {
  getRestaurantes,
  createRestaurante,
  updateRestaurante,
  deleteRestaurante,
} = require("./controllers/restaurnates");
//para categoria
const {
  getCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria,
} = require("./controllers/categoria");
//para menu
const {
  getMenus,
  createMenu,
  updateMenu,
  deleteMenu,
} = require("./controllers/menu");

const router = require("express").Router();
// ruta get principal
router.get("/", async (req, res) => {
  res.send("Let's build a CRUD API!");
});
// ruta get /todos
router.get("/Recetas", getRecetas);
router.post("/Recetas", createReceta);
router.put("/Recetas/:recetaID", updateReceta);
router.delete("/Recetas/:recetaID", deleteReceta);
//rutas para coleccion usuario
router.get("/usuarios", getUsuarios);
router.get("/usuarios/:usuarioNOMBRE/:usuarioCONTRASENA", validLogin);
router.post("/usuarios", createUsuario);
router.put("/usuarios/:usuarioID", updateUsuario);
router.delete("/usuarios/:usuarioID", deleteUsuario);
//rutas para la coleccion de ingredientes
router.get("/ingrediente", getIngredientes);
router.post("/ingrediente", createIngrediente);
router.put("/ingrediente/:ingredienteID", updateIngrediente);
router.delete("/ingrediente/:ingredienteID", deleteIngrediente);
//rutas para coleccion restaurantes
router.get("/restaurante", getRestaurantes);
router.post("/restaurante", createRestaurante);
router.put("/restaurante/:restauranteID", updateRestaurante);
router.delete("/restaurante/:restauranteID", deleteRestaurante);
//rutas para coleccion categorias
router.get("/categoria", getCategorias);
router.post("/categoria", createCategoria);
router.put("/categoria/:categoriaID", updateCategoria);
router.delete("/categoria/:categoriaID", deleteCategoria);
//rutas para coleccion menu
router.get("/menu", getMenus);
router.post("/menu", createMenu);
router.put("/menu/:menuID", updateMenu);
router.delete("/menu/:menuID", deleteMenu);
module.exports = router;
