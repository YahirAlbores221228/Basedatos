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


const rateLimit = require("express-rate-limit");
  
  //funcion para limitar peticiones
const accountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 100,
  message: "Hemos recibido demasiadas peticiones de tu IP, vuelve a intentar dentro de 1 hora"
});



// ruta get /todos
router.get("/Recetas", getRecetas);
router.post("/Recetas", createReceta, accountLimiter);
router.put("/Recetas/:recetaID", updateReceta, accountLimiter);
router.delete("/Recetas/:recetaID", deleteReceta, accountLimiter);
//rutas para coleccion usuario
router.get("/usuarios", getUsuarios);
router.get("/usuarios/:usuarioNOMBRE/:usuarioCONTRASENA", validLogin, accountLimiter);
router.post("/usuarios", createUsuario, accountLimiter);
router.put("/usuarios/:usuarioID", updateUsuario, accountLimiter);
router.delete("/usuarios/:usuarioID", deleteUsuario, accountLimiter);
//rutas para la coleccion de ingredientes
router.get("/ingrediente", getIngredientes);
router.post("/ingrediente", createIngrediente);
router.put("/ingrediente/:ingredienteID", updateIngrediente);
router.delete("/ingrediente/:ingredienteID", deleteIngrediente, accountLimiter);
//rutas para coleccion restaurantes
router.get("/restaurante", getRestaurantes);
router.post("/restaurante", createRestaurante, accountLimiter);
router.put("/restaurante/:restauranteID", updateRestaurante, accountLimiter);
router.delete("/restaurante/:restauranteID", deleteRestaurante, accountLimiter);
//rutas para coleccion categorias
router.get("/categoria", getCategorias);
router.post("/categoria", createCategoria);
router.put("/categoria/:categoriaID", updateCategoria, accountLimiter);
router.delete("/categoria/:categoriaID", deleteCategoria, accountLimiter);
//rutas para coleccion menu
router.get("/menu", getMenus);
router.post("/menu", createMenu, accountLimiter);
router.put("/menu/:menuID", updateMenu, accountLimiter);
router.delete("/menu/:menuID", deleteMenu, accountLimiter);
module.exports = router;
