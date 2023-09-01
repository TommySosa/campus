create database campus;

use campus;

create table roles(
	id_rol int not null unique auto_increment,
    name varchar(30) not null,
    
    primary key(id_rol)
);


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
    id_rol int not null,
    
    primary key(id_user),
    foreign key (id_rol) references roles(id_rol)
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

























