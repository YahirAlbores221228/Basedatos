const Ingrediente = require("../model/ingrediente");
// Obtener todos los objetos de ingredientes
const getIngredientes = async (req, res) => {
  Ingrediente.find((err, ingredientes) => {
    if (err) {
      res.send(err);
    }
    res.json(ingredientes);
  });
};
// Crear un objeto con el formato indicado de ingredientes
const createIngrediente = async (req, res) => {
  const ingrediente = new Ingrediente({
    Costo: req.body.Costo,
    Descripcion: req.body.Descripcion,
    Cantidad: req.body.Cantidad,
  });

ingrediente.save( async (err, ingrediente) => {
    if (err) {
      res.send(err);
    }
    res.json(ingrediente);
  });
};
const updateIngrediente = async (req, res) => {
  Ingrediente.findOneAndUpdate(
    { _id: req.params.ingredienteID },
    {
      $set: {
      costo: req.body.Costo,
      Descripcion: req.body.Descripcion,
      Cantidad: req.body.Cantidad,
      },
    },
    { new: true },
    (err, Ingrediente) => {
      if (err) {
        res.send(err);
      } else res.json(Ingrediente);
    }
  );
};
// borrar un elemento a través del _id de ingrediente
const deleteIngrediente = async (req, res) => {
  Ingrediente.deleteOne({ _id: req.params.ingredienteID })
    .then(() => res.json({ message: "Ingrediente eliminado" }))
    .catch((err) => res.send(err));
};
module.exports = {
  getIngredientes,
  createIngrediente,
  updateIngrediente,
  deleteIngrediente,
};
