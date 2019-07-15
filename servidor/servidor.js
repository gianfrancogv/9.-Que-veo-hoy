//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var controlador = require('./controladores/controlador');

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

var router = express.Router();

const peliculas = router.get('/', (req, res, next) => {
  console.log("Entró a la ruta peliculas");
  controlador.getpelicula(req, resp => { 
    res.json(resp);
  });
});

app.use('/peliculas', peliculas);

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});

