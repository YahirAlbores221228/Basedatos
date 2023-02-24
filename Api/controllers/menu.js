const Menu = require("../model/menu");
// Obtener todos los objetos de menu
const getMenus = async (req, res) => {
 Menu.find((err, menus) => {
    if (err) {
      res.send(err);
    }
    res.json(menus);
  });
};
// Crear un objeto con el formato de menu
const createMenu = async (req, res) => {
  const menu = new Menu({
    Nombre_del_platillo: req.body.Nombre_del_platillo,
    Categoria: req.body.Categoria,
    Precios: req.body.Precios,
    Receta: req.body.Receta,
  });

menu.save( async (err, menu) => {
    if (err) {
      res.send(err);
    }
    res.json(menu);
  });
};
// actualizar un elemento a partir del _id de Menu
const updateMenu = async (req, res) => {
  Menu.findOneAndUpdate(
    { _id: req.params.menuID },
    {
      $set: {
        Nombre_del_platillo: req.body.Nombre_del_platillo,
        Categoria: req.body.Categoria,
        Precios: req.body.Precios,
        Receta: req.body.Receta,
      },
    },
    { new: true },
    (err, Menu) => {
      if (err) {
        res.send(err);
      } else res.json(Menu);
    }
  );
};
// borrar un elemento a través del _id de categoria
const deleteMenu = async (req, res) => {
 Menu.deleteOne({ _id: req.params.menuID })
    .then(() => res.json({ message: "El menu se elimino correctamente" }))
    .catch((err) => res.send(err));
};
module.exports = {
  getMenus,
  createMenu,
  updateMenu,
  deleteMenu,
};
