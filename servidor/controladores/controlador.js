var con = require("../lib/conexionbd")

function mostrarPeliculas(req, res){

    var pagina = parseInt(req.query.pagina)
    var cantidad = parseInt(req.query.cantidad)
    var primeraFila = (function(){
        if(pagina == 1){
            return 1
        } else {return pagina + (cantidad-1)*(pagina-1)
            }
    })()
    var columna_orden = req.query.columna_orden
    var titulo = req.query.titulo
    var tipo_orden = req.query.tipo_orden
    var anio = req.query.anio
    var genero = req.query.genero

    var sqlTitulo = "titulo LIKE '%" + titulo + "%' "
    var sqlAnio = "anio = " + anio
    var sqlGenero = "genero_id = " + genero

    var whereSql = (function(){
        if(titulo && anio && genero){
            return "WHERE " + sqlTitulo + " AND " + sqlAnio + " AND " + sqlGenero + " "
        } else if (titulo && anio && !genero ){
            return "WHERE " + sqlTitulo + " AND " + sqlAnio + " "
        } else if (titulo && !anio && genero ){
            return "WHERE " + sqlTitulo + " AND " + sqlGenero + " "
        } else if (!titulo && anio && genero ){
            return "WHERE " + sqlAnio + " AND " + sqlGenero + " "
        } else if (titulo && !anio && !genero ){
            return "WHERE " + sqlTitulo + " "
        } else if (!titulo && anio && !genero ){
            return "WHERE " + sqlAnio + " "
        } else if (!titulo && !anio && genero ){
            return "WHERE " + sqlGenero + " "
        }
        else return ""       
    })()
    

    var sqlBuscar = "SELECT * FROM pelicula " + whereSql + "ORDER BY " +  columna_orden + " " +  tipo_orden + " LIMIT " + primeraFila + ", " + cantidad
    
    
    
    con.query(sqlBuscar, function(error, resultado, fields){
        if(error){
            console.log("Hubo un error en la consulta", error.message)
            return res.status(404).send("Hubo un error en la consulta")
        }
        
        var sqlCount = "SELECT COUNT(*) AS COUNT FROM pelicula " + whereSql
        
        con.query(sqlCount, function(error, resultado2, fields){
            if(error){   
                console.log("Hubo un error en la consulta", error.message)
                return res.status(404).send("Hubo un error en la consulta")
            }

            console.log(resultado2)
            var response = {
                'peliculas': resultado,
                'total': resultado2[0].COUNT
            }  
            res.send(JSON.stringify(response))
        })
    })

}
