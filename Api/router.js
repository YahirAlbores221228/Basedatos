const router = require("express").Router();
const verifyToken = require("../Api/jwt");
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
// ruta get principal
router.get("/", async (req, res) => {
  res.send("Let's build a CRUD API!");
});

  
  //funcion para limitar peticiones
/* const accountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 10,
  message: "Hemos recibido demasiadas peticiones de tu IP, vuelve a intentar dentro de 1 hora"
});
 */


// ruta get /todos
router.get("/Recetas", getRecetas);
router.post("/Recetas", createReceta ,accountLimiter);
router.put("/Recetas/:recetaID", updateReceta,accountLimiter,verifyToken);
router.delete("/Recetas/:recetaID", deleteReceta,accountLimiter);
//rutas para coleccion usuario
router.get("/usuarios", getUsuarios, verifyToken);
router.get("/usuarios/:usuarioNOMBRE/:usuarioCONTRASENA", validLogin);
router.post("/usuarios", createUsuario,accountLimiter);
router.put("/usuarios/:usuarioID", updateUsuario, verifyToken);
router.delete("/usuarios/:usuarioID", deleteUsuario , verifyToken);
//rutas para la coleccion de ingredientes
router.get("/ingrediente", getIngredientes);
router.post("/ingrediente", createIngrediente);
router.put("/ingrediente/:ingredienteID", updateIngrediente,verifyToken);
router.delete("/ingrediente/:ingredienteID", deleteIngrediente,verifyToken);
//rutas para coleccion restaurantes
router.get("/restaurante", getRestaurantes);
router.post("/restaurante", createRestaurante,accountLimiter);
router.put("/restaurante/:restauranteID", updateRestaurante, verifyToken);
router.delete("/restaurante/:restauranteID", deleteRestaurante, verifyToken);
//rutas para coleccion categorias
router.get("/categoria", getCategorias);
router.post("/categoria", createCategoria);
router.put("/categoria/:categoriaID", updateCategoria,verifyToken);
router.delete("/categoria/:categoriaID", deleteCategoria,verifyToken);
//rutas para coleccion menu
router.get("/menu", getMenus);
router.post("/menu", createMenu,accountLimiter);
router.put("/menu/:menuID", updateMenu,verifyToken);
router.delete("/menu/:menuID", deleteMenu,verifyToken);
module.exports = router;
