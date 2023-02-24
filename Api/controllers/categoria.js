const Categoria = require("../model/categoria");
// Obtener todos los objetos de categoria
const getCategorias = async (req, res) => {
  Categoria.find((err, categorias) => {
    if (err) {
      res.send(err);
    }
    res.json(categorias);
  });
};
// Crear un objeto con el formato de categoria
const createCategoria = async (req, res) => {
  const categoria = new Categoria({
    Por_precio: req.body.Por_precio,
    Ingredientes_disponible: req.body.Ingredientes_disponible,
  });

categoria.save( async (err, categoria) => {
    if (err) {
      res.send(err);
    }
    res.json(categoria);
  });
};
// actualizar un elemento a partir del _id de categoria
const updateCategoria = async (req, res) => {
  Categoria.findOneAndUpdate(
    { _id: req.params.categoriaID },
    {
      $set: {
        Por_precio: req.body.Por_precio,
        Ingredientes_disponible: req.body.Ingredientes_disponible,
      },
    },
    { new: true },
    (err, Categoria) => {
      if (err) {
        res.send(err);
      } else res.json(Categoria);
    }
  );
};
// borrar un elemento a través del _id de categoria
const deleteCategoria = async (req, res) => {
  Categoria.deleteOne({ _id: req.params.categoriaID })
    .then(() => res.json({ message: "Categoria eliminada" }))
    .catch((err) => res.send(err));
};
module.exports = {
  getCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria,
};
