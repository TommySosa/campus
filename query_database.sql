create database campus;
use campus;

create table roles(
	id_rol int not null unique auto_increment,
    name varchar(15),
    
    primary key(id_rol)
);

create table categories(
	id_category int not null unique auto_increment,
    name varchar(50) not null,
    
    primary key(id_category)
);

create table users(
	id_user int not null unique auto_increment,
    name varchar(40) not null,
    surname varchar(40) not null,
    email varchar(50) not null unique,
    password varchar(250) not null,
    profile_url varchar(300),
    description varchar(250),
    id_rol int not null,
    dni int,
    
    primary key(id_user),
    foreign key(id_rol) references roles(id_rol)
);

create table courses(
	id_course int not null unique auto_increment,
    name varchar(100),
    description varchar(500),
    url_image varchar(300),
    id_category int not null,
    id_user int not null,
    
    primary key(id_course),
    foreign key(id_category) references categories(id_category),
    foreign key(id_user) references users(id_user)
);

create table modules(
	id_module int not null unique auto_increment,
    name varchar(250),
    id_course int not null,
    
    primary key(id_module),
    foreign key(id_course) references courses(id_course)
);

create table exercise_types(
	id_type int not null unique auto_increment,
    name varchar(50) not null,
    
    primary key(id_type)
);

create table exercises(
	id_exercise int not null unique auto_increment,
    name varchar(50) NOT NULL,
    instruction varchar(300) NOT NULL,
    id_module int not null,
    id_type int not null,
    
    primary key(id_exercise),
    foreign key(id_module) references modules(id_module),
    foreign key(id_type) references exercise_types(id_type)
);

create table multiple_choise(
	id_exercise int not null,
    options JSON,
    
    primary key (id_exercise),
    foreign key(id_exercise) references exercises(id_exercise)
);

create table true_or_false(
	id_exercise int,
    true_option varchar(250) not null,
    false_option varchar(250) not null,
    
    primary key(id_exercise),
    foreign key(id_exercise) references exercises(id_exercise)
);

create table drag_and_drop(
	id_exercise int,
    instruction varchar(250) not null,
    
    primary key(id_exercise),
    foreign key(id_exercise) references exercises(id_exercise)
);

create table drag_options(
	id_option int auto_increment unique,
    id_exercise int not null,
    text varchar(250) not null,
    
    primary key(id_option),
    foreign key(id_exercise) references drag_and_drop(id_exercise)
);

CREATE TABLE student_courses (
    id_student_course int not null unique auto_increment,
    id_user int not null,
    id_course int not null,
    
    primary key(id_student_course),
    foreign key(id_user) references users(id_user),
    foreign key(id_course) references courses(id_course)
);

create table correct_exercises(
	id_correct int auto_increment primary key,
    id_exercise int,
    id_user int,
    
    foreign key(id_exercise) references exercises(id_exercise),
    foreign key(id_user) references users(id_user)
);

create table incorrect_exercises(
	id_incorrect int auto_increment primary key,
    id_exercise int,
    id_user int,
    
    foreign key(id_exercise) references exercises(id_exercise),
    foreign key(id_user) references users(id_user)
);

create table attendance (
  id int auto_increment primary key,
  id_user INT NOT NULL,
  date timestamp default current_timestamp,
  foreign key (id_user) references users(id_user)
);
-- update users set dni = 44616532 where id_user = 2;

-- alter table users add column dni int unique;

insert into role(name) values ("Estudiante");
insert into role(name) values ("Profesor");
insert into category(name) values ('English');
insert into courses(name,description,id_category, id_user) values ('Curso 1','Descripcion del curso 1', 1, 1);
insert into modules(name,id_course) values('Modulo del curso 1', 2);
insert into exercisetype(name) values('Multiple Choise');
insert into exercisetype(name) values('Verdadero o falso');
insert into exercises(name,instruction,id_module,id_type) values("Verb to be 1", "Realiza el sig. ejercicio", 4, 1);
insert into exercises(name,instruction,id_module,id_type) values("He-She-It", "Como se dice él", 4, 2);
INSERT INTO multiple_choise (id_exercise, options) VALUES (2, '[{"text": "Opción A", "correct": true}, {"text": "Opción B", "correct": false}, {"text": "Opción C", "correct": false}]');
INSERT INTO multiple_choise (id_exercise, options) VALUES (3, '[{"text": "Opción A", "correct": false}, {"text": "Opción B", "correct": true}, {"text": "Opción C", "correct": false}]');
insert into true_or_false(id_exercise,true_option, false_option) values(4,'He', 'She');
insert into correct_exercises(id_exercise, id_user) values(2, 1);
UPDATE users SET id_rol = (2) WHERE id_user = 1;


use campus;
DELIMITER //

CREATE PROCEDURE DesactivarEjercicio(IN id_exercise INT)
BEGIN
    DECLARE activo_actual BOOLEAN;

    -- Obtener el estado actual del ejercicio
    SELECT active INTO activo_actual
    FROM exercise
    WHERE exercise.id_exercise = id_exercise;

    -- Verificar si el ejercicio está activo
    IF activo_actual = TRUE THEN
        -- Actualizar el estado en la tabla exercises
        UPDATE exercise
        SET active = FALSE
        WHERE exercise.id_exercise = id_exercise;

        -- Actualizar el estado en la tabla trueorfalse
        UPDATE trueorfalse
        SET active = FALSE
        WHERE trueorfalse.id_exercise = id_exercise;

        -- Actualizar el estado en la tabla multiplechoise
        UPDATE multiplechoise
        SET active = FALSE
        WHERE multiplechoise.id_exercise = id_exercise;

        SELECT 'Ejercicio desactivado exitosamente.' AS mensaje;
    ELSE
        SELECT 'El ejercicio ya está desactivado.' AS mensaje;
    END IF;
END //

DELIMITER ;


-- Supongamos que 'id_user' es el identificador del usuario actual y 'current_module' es el módulo actual del usuario
SELECT COUNT(*) AS total_ejercicios_modulo_anterior
FROM exercise e
LEFT JOIN correctexercise ce ON e.id_exercise = ce.id_exercise AND ce.id_user = 2
LEFT JOIN incorrectexercise ie ON e.id_exercise = ie.id_exercise AND ie.id_user = 2
WHERE e.id_module = 2 - 1
    AND (ce.id_correct IS NOT NULL OR ie.id_incorrect IS NOT NULL);

-- Si el resultado de la consulta es igual al número total de ejercicios del módulo anterior, entonces el usuario ha completado todos los ejercicios.


-- Supongamos que 'id_user' es el identificador del usuario actual y 'current_module' es el módulo actual del usuario
SELECT COUNT( e.id_exercise) AS total_ejercicios_modulo_anterior
FROM exercise e
LEFT JOIN correctexercise ce ON e.id_exercise = ce.id_exercise AND ce.id_user = 2
LEFT JOIN incorrectexercise ic on e.id_exercise = ic.id_exercise AND ic.id_user = 2
WHERE e.id_module = (
    SELECT MAX(id_module) FROM exercise WHERE id_module < 3
)
AND (ce.id_correct IS NOT NULL);


-- Supongamos que 'id_user' es el identificador del usuario actual y 'id_module' es el módulo para el cual deseas contar los ejercicios
SELECT
    COUNT(DISTINCT ce.id_exercise) + COUNT(DISTINCT ic.id_exercise) AS total_ejercicios_realizados
FROM exercise e
LEFT JOIN correctexercise ce ON e.id_exercise = ce.id_exercise AND ce.id_user = 2
LEFT JOIN incorrectexercise ic ON e.id_exercise = ic.id_exercise AND ic.id_user = 2
WHERE e.id_module = (select MAX(id_module) from module where id_module < 4);

select Count(id_exercise) as total_por_realizar from exercise where id_module = 3;

select id_module from module where id_course = 2;


-- Supongamos que 'id_user' es el identificador del usuario actual y 'id_module' es el módulo actual del usuario
SELECT
    (
        SELECT COUNT(DISTINCT ce.id_exercise) + COUNT(DISTINCT ic.id_exercise)
        FROM exercise e
        LEFT JOIN correctexercise ce ON e.id_exercise = ce.id_exercise AND ce.id_user = 2 and active = 1
        LEFT JOIN incorrectexercise ic ON e.id_exercise = ic.id_exercise AND ic.id_user = 2 and active = 1
        WHERE e.id_module = 3
    ) AS total_ejercicios_realizados,
    (
        SELECT COUNT(id_exercise)
        FROM exercise
        WHERE id_module = 3 and active = 1
    ) AS total_ejercicios_modulo;







