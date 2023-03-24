const Receta = require("../model/receta");
const {uploadFile, getFiles} = require('../S3.js');
const getRecetas = async (req, res) => {
  Receta.find((err, recetas) => {
    if (err) {
      res.send(err);
    }
    res.json(recetas);
  });
 await getFiles()
};
const createReceta = async (req, res) => {
  const receta = new Receta({
    Nombre_de_receta: req.body.Nombre_de_receta,
    Lugar_de_origen: req.body.Lugar_de_origen,
    Ingredientes: req.body.Ingredientes,
    Precio: req.body.Precio,
    Descripcion: req.body.Descripcion,
    Porcion: req.body.Porcion,
  });
   await uploadFile(req.files.file);

  receta.save( async (err, receta) => {
    if (err) {
      res.send(err);
    }
    res.json(receta);
  });
};
const updateReceta = async (req, res) => {
  Receta.findOneAndUpdate(
    { _id: req.params.recetaID },
    {
      $set: {
       Nombre_de_receta: req.body.Nombre_de_receta,
      Lugar_de_origen: req.body.Lugar_de_origen,
      Ingredientes: req.body.Ingredientes,
      Precio: req.body.Precio,
      Descripcion: req.body.Descripcion,
     Porcion: req.body.Porcion,
      },
    },
    { new: true },
    (err, Receta) => {
      if (err) {
        res.send(err);
      } else res.json(Receta);
    }
  );
};

const deleteReceta = async (req, res) => {
  Receta.deleteOne({ _id: req.params.recetaID })
    .then(() => res.json({ message: "Receta eliminada" }))
    .catch((err) => res.send(err));
};
module.exports = {
  getRecetas,
  createReceta,
  updateReceta,
  deleteReceta,
};
