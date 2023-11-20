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
    foreign key(id_rol) references roles(id_rol)
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

CREATE TABLE student_courses (
    id_student_course int not null unique auto_increment,
    id_student int not null,
    id_course int not null,
    
    primary key(id_student_course),
    foreign key(id_student) references students(id_user),
    foreign key(id_course) references courses(id_course)
);

insert into roles(name) values ("student");
insert into roles(name) values ("teacher");
insert into categories(name) values ('English');
insert into courses(name,description,id_category) values ('Curso 1','Descripcion del curso 1', 1);
insert into modules(name,id_course) values('Modulo del curso 1', 1);
insert into exercise_types(name) values('Multiple Choise');
insert into exercise_types(name) values('Verdadero o falso');
insert into exercises(name,instruction,id_module,id_type) values("Verb to be 1", "Realiza el sig. ejercicio", 1, 1);
insert into exercises(name,instruction,id_module,id_type) values("He-She-It", "Como se dice él", 1, 2);
INSERT INTO multiple_choise (id_exercise, options) VALUES (1, '[{"text": "Opción A", "correct": true}, {"text": "Opción B", "correct": false}, {"text": "Opción C", "correct": false}]');
INSERT INTO multiple_choise (id_exercise, options) VALUES (3, '[{"text": "Opción A", "correct": false}, {"text": "Opción B", "correct": true}, {"text": "Opción C", "correct": false}]');
insert into true_or_false(id_exercise,true_option, false_option) values(4,'He', 'She');
UPDATE users SET id_rol = (2) WHERE id_user = 1;






