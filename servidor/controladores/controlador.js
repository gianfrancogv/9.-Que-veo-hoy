var con = require("../lib/conexionbd");

exports.getpelicula = (req, next) => {
    con.query('select * from pelicula', [], (err, result) => {
        if (err)
            console.log("Error al conectarse", err);
        else {	
            var respuesta = {peliculas: JSON.parse(JSON.stringify(result))};
            next(respuesta);
        }
    });
}
