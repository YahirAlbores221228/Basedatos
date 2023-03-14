// definicion de librerias
const express = require("express");
const router = require("./router");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// variables de entorno
dotenv.config();

// Puerto 
const PORT = process.env.PORT || 8000;
const app = express();

// Libreria para mongodb - usa URL que debe existir en .env
// usa la Base de datos llamada mongo y la coleccion llamada todos
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
// se usa con express, peticiones cruzadas.
app.use(cors());

//
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// uso de router.js
app.use(router);



/* app.listen(PORT, async () => {
  console.log('La aplicación está escuchando en PORT.');
});
 */
app.listen(PORT, async () => {
  console.log(`server up on port ${PORT}`);
});


// Crear un servidor HTTPS, ya debes tener tus archivos generados por certbot


var fs = require('fs');
var https = require('https');
const PUERTO = 3000;

https.createServer({
cert: fs.readFileSync('/etc/letsencrypt/archive/receita.iothings.com.mx/fullchain1.pem'),
key: fs.readFileSync('/etc/letsencrypt/archive/receita.iothings.com.mx/privkey1.pem')
},app).listen(PUERTO, function(){
console.log('Servidor https corriendo en el puerto 443');
});

app.get('/', function(req, res){
res.send('Hola, estas en la pagina inicial');
console.log('Se recibio una petición get a través de https');
});
