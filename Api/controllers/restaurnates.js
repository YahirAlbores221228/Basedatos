const Restaurante = require("../model/restaurantes");
const {uploadFile, getFiles} = require('../S3.js');
// Obtener todos los objetos de restaurante

const getRestaurantes = async (req, res) => {
 Restaurante.find((err, restaurantes) => {
    if (err) {
      res.send(err);
    }
    res.json(restaurantes);
  });
 await getFiles()
};

// Crear un objeto con el formato indicado del restaurante
const createRestaurante = async (req, res) => {
  const restaurante = new Restaurante({
    Nombre: req.body.Nombre,
    Tipo: req.body.Tipo,
    Ubicacion: req.body.Ubicacion,
    Contrasena: req.body.Contrasena,
    Imege: `https://fazt-receita-aws.s3.amazonaws.com/${req.files.file.name}`
  });
 await uploadFile(req.files.file)
restaurante.save( async (err, restaurante) => {
    if (err) {
      res.send(err);
    }
    res.json(restaurante);
  });
};
const updateRestaurante = async (req, res) => {
  Restaurante.findOneAndUpdate(
    { _id: req.params.restauranteID },
    {
      $set: {
      
      Nombre: req.body.Nombre,
    Tipo: req.body.Tipo,
    Ubicacion: req.body.Ubicacion,
 Contrasena: req.body.Contrasena,
      },
    },
    { new: true },
    (err, Restaurante) => {
      if (err) {
        res.send(err);
      } else res.json(Restaurante);
    }
  );
};
// borrar un elemento a través del _id de ingrediente
const deleteRestaurante = async (req, res) => {
  Restaurante.deleteOne({ _id: req.params.restauranteID })
    .then(() => res.json({ message: "Restaurante eliminado" }))
    .catch((err) => res.send(err));
};
module.exports = {
  getRestaurantes,
  createRestaurante,
  updateRestaurante,
  deleteRestaurante,
};
