CREATE DATABASE queveohoy;

CREATE TABLE pelicula (
	id INT NOT NULL AUTO_INCREMENT,
	titulo VARCHAR (100),
	duracion INT,
	director VARCHAR (400),
	anio INT,
	fecha_lanzamiento DATE,
	puntuacion INT,
	poster VARCHAR (300),
	trama VARCHAR (700),
	genero_id INT,
	PRIMARY KEY (id),
	FOREIGN KEY (genero_id) REFERENCES genero(id)
);