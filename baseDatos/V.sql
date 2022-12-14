SELECT * FROM db_escuela.v_alumno;

//crear trigger para la tabla alumno
CREATE TRIGGER tr_alumno
AFTER INSERT ON db_escuela.alumno
FOR EACH ROW
BEGIN
INSERT INTO db_escuela.v_alumno VALUES (NEW.id_alumno, NEW.nombre, NEW.apellido, NEW.dni, NEW.fecha_nacimiento, NEW.id_domicilio, NEW.id_curso);
END;


//procedimiento almacenado para insertar alumno
DELIMITER $$
CREATE PROCEDURE db_escuela.insertar_alumno (IN nombre VARCHAR(50), IN apellido VARCHAR(50), IN dni VARCHAR(8), IN fecha_nacimiento DATE, IN id_domicilio INT, IN id_curso INT)
BEGIN
INSERT INTO db_escuela.alumno (nombre, apellido, dni, fecha_nacimiento, id_domicilio, id_curso) VALUES (nombre, apellido, dni, fecha_nacimiento, id_domicilio, id_curso);
END$$
DELIMITER ;