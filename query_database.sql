create database campus;

use campus;

create table categories(
	id_category int not null unique auto_increment,
    name varchar(50) not null,
    
    primary key(id_category)
);

create table courses(
	id_course int not null unique auto_increment,
    name varchar(100),
    description varchar(500),
    url_image varchar(300),
    id_category int not null,
    
    primary key(id_course),
    foreign key(id_category) references categories(id_category)
);

create table users(
	id_user int not null unique auto_increment,
    name varchar(40) not null,
    surname varchar(40) not null,
    email varchar(50) not null unique,
    password varchar(250) not null,
    profile_url varchar(300),
    description varchar(250),
    
    primary key(id_user)
);

create table progress(
	id_progress int not null unique auto_increment,
    correct_exercises int,
    incorrect_exercises int,
    total_exercises int,
    id_course int,
    id_user int,
    
    primary key(id_progress),
    foreign key(id_course) references courses(id_course),
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

-- Insertar un ejercicio de opción múltiple con opciones en formato JSON
-- INSERT INTO exercises (exercise_id, id_type) VALUES (1, 1); -- Ejemplo, donde 1 es el ID del tipo de ejercicio
-- INSERT INTO multiple_choice (exercise_id, options) VALUES (1, '[{"text": "Opción A", "correct": true}, {"text": "Opción B", "correct": false}, {"text": "Opción C", "correct": false}]');

-- Consulta para obtener ejercicio de opción múltiple y sus opciones
-- SELECT e.id_exercise, m.options
-- FROM exercises e
-- INNER JOIN multiple_choice m ON e.id_exercise = m.id_exercise
-- WHERE e.id_exercise = 1; -- Cambiar el ID del ejercicio según sea necesario

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

-- Insertar ejercicio de arrastrar y soltar en tabla drag_and_drop
-- INSERT INTO drag_and_drop (exercise_id, statement) VALUES (1, 'Arrastra las opciones correctas al lugar correcto.');

-- Insertar opciones arrastrables en tabla drag_options para el ejercicio con exercise_id 1
-- INSERT INTO drag_options (exercise_id, text) VALUES (1, 'Opción 1');
-- INSERT INTO drag_options (exercise_id, text) VALUES (1, 'Opción 2');
-- INSERT INTO drag_options (exercise_id, text) VALUES (1, 'Opción 3');
-- Puedes agregar más opciones aquí


select * from users;
insert into categories(name) values ('English');
insert into courses(name,description,id_category) values ('Curso 1','Descripcion del curso 1', 1);
insert into progress(correct_exercises, incorrect_exercises, total_exercises, id_course, id_user) values(23,7, 30, 1, 1);
insert into modules(name,id_course) values('Modulo de prueba', 1);
insert into exercise_types(name) values('Verdadero o falso');
insert into exercises(name,instruction,id_module,id_type) values("Verb to be 1", "Realiza el sig. ejercicio", 1, 1);
insert into exercises(name,instruction,id_module,id_type) values("He-She-It", "Como se dice él", 1, 2);
select * from exercises;
INSERT INTO multiple_choise (id_exercise, options) VALUES (1, '[{"text": "Opción A", "correct": true}, {"text": "Opción B", "correct": false}, {"text": "Opción C", "correct": false}]');
INSERT INTO multiple_choise (id_exercise, options) VALUES (3, '[{"text": "Opción A", "correct": false}, {"text": "Opción B", "correct": true}, {"text": "Opción C", "correct": false}]');

select * from categories;
select * from courses;
select * from progress;
select * from modules;
select * from exercise_types;
select * from exercises;
select * from multiple_choise;
select * from true_or_false;
insert into true_or_false(id_exercise,true_option, false_option) values(4,'He', 'She');

SELECT exercises.*, exercise_types.name AS exercise_type
FROM exercises
INNER JOIN exercise_types ON exercises.id_type = exercise_types.id_type;


SELECT 
    exercises.*, 
    exercise_types.name AS exercise_type,
    multiple_choise.options AS multiple_choice_options,
    true_or_false.true_option,
    true_or_false.false_option,
    drag_and_drop.instruction AS drag_and_drop_instruction,
    GROUP_CONCAT(drag_options.text) AS drag_options_texts
FROM exercises
INNER JOIN exercise_types ON exercises.id_type = exercise_types.id_type
LEFT JOIN multiple_choise ON exercises.id_exercise = multiple_choise.id_exercise
LEFT JOIN true_or_false ON exercises.id_exercise = true_or_false.id_exercise
LEFT JOIN drag_and_drop ON exercises.id_exercise = drag_and_drop.id_exercise
LEFT JOIN drag_options ON drag_and_drop.id_exercise = drag_options.id_exercise
GROUP BY exercises.id_exercise;

-- Crea las tablas students y teachers
CREATE TABLE students (
    id_user int not null unique,
    
    primary key(id_user),
    foreign key (id_user) references users(id_user)
);

CREATE TABLE teachers (
    id_user int not null unique,
    
    primary key(id_user),
    foreign key (id_user) references users(id_user)
);

-- Crear la tabla intermedia para estudiantes y cursos
CREATE TABLE student_courses (
    id_student_course int not null unique auto_increment,
    id_student int not null,
    id_course int not null,
    
    primary key(id_student_course),
    foreign key(id_student) references students(id_user),
    foreign key(id_course) references courses(id_course)
);

-- Crear la tabla intermedia para profesores y cursos
CREATE TABLE teacher_courses (
    id_teacher_course int not null unique auto_increment,
    id_teacher int not null,
    id_course int not null,
    
    primary key(id_teacher_course),
    foreign key(id_teacher) references teachers(id_user),
    foreign key(id_course) references courses(id_course)
);

select * from courses;

SELECT * FROM teacher_courses WHERE id_course = 1;

