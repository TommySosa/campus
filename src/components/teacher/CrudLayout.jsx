"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import ExerciseTable from "../ExerciseTable"
import CourseTable from "../CourseTable"
import ModuleTable from "../ModuleTable"
import StudentTable from "../StudentTable"
import TeacherTable from "../TeacherTable"
import ContentTable from "../ContentTable"
import RefreshSvg from "../RefreshSvg"

export default function CrudLayout() {
    const [exercises, setExercises] = useState([])
    const [modules, setModules] = useState([])
    const [openCreate, setOpenCreate] = useState(false)
    const [openCreateModule, setOpenCreateModule] = useState(false)
    const [openCreateCourse, setOpenCreateCourse] = useState(false)
    const [openCreateStudent, setOpenCreateStudent] = useState(false)
    const [openCreateTeacher, setOpenCreateTeacher] = useState(false)
    const [openCreateContent, setOpenCreateContent] = useState(false)
    const [openActions, setOpenActions] = useState(false)
    const [enableCourse, setEnableCourse] = useState(false)
    const [enableExercise, setEnableExercise] = useState(true)
    const [enableModule, setEnableModule] = useState(false)
    const [enableStudent, setEnableStudent] = useState(false)
    const [enableTeacher, setEnableTeacher] = useState(false)
    const [enableContent, setEnableContent] = useState(false)
    const [courses, setCourses] = useState([])
    const [users, setUsers] = useState([])
    const [students, setStudents] = useState([])
    const [teachers, setTeachers] = useState([])
    const [contents, setContents] = useState([])
    const [user, setUser] = useState({
        name: "",
        surname: "",
        email: "",
        dni: "",
    })
    const [inscriptions, setInscriptions] = useState([])
    const [filteredData, setFilteredData] = useState({
        users: [],
        modules: [],
        courses: [],
        exercises: [],
        teachers: [],
        contents: []
    });
    async function fetchExercises() {
        // const response = axios.get( ` ${process.env.API_URL}/exercises ` )
        try {
            const response = await axios.get(`/api/exercises `)
            const data = await response.data.data
            setExercises(data)
            console.log(data);
        } catch (error) {
            console.error('Error');
        }
    }
    async function fetchModules() {
        try {
            const response = await axios.get(`http://localhost:4001/api/modules`)
            const data = await response.data
            setModules(data)

        } catch (error) {
            console.log(error);
        }
    }
    async function fetchCourses() {
        try {
            const response = await axios.get(`http://localhost:4001/api/courses`)
            const data = await response.data
            setCourses(data)
        } catch (error) {
            console.log(error);
        }
    }
    async function fetchStudents() {
        try {
            const response = await axios.get(`http://localhost:4001/api/students`)
            const data = await response.data
            setStudents(data)
        } catch (error) {
            console.log(error);
        }
    }
    async function fetchUsers() {
        try {
            const response = await axios.get('http://localhost:4001/api/users')
            const data = await response.data
            console.log(data);
            setUsers(data)
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchInscriptions() {
        try {
            const response = await axios.get('http://localhost:4001/api/inscriptions')
            const data = await response.data
            setInscriptions(data)
            console.log('inscriptions', data);
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchTeachers() {
        try {
            const response = await axios.get('http://localhost:4001/api/teachers')
            const data = await response.data
            setTeachers(data)
        } catch (error) {
            console.log(error);
        }
    }
    async function fetchContents(){
        try {
            const response = await axios.get('http://localhost:4001/api/contents')
            const data = await response.data
            setContents(data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchContents()
    }, [])
    useEffect(() => {
        fetchTeachers()
    }, [])
    useEffect(() => {
        fetchInscriptions()
    }, [])
    useEffect(() => {
        fetchUsers()
    }, [])
    useEffect(() => {
        fetchModules()
    }, [])
    useEffect(() => {
        fetchExercises()
    }, [])
    useEffect(() => {
        fetchCourses()
    }, [])
    useEffect(() => {
        fetchStudents()
    }, [])

    const handleRefresh = () => {
        fetchExercises()
        fetchCourses()
        fetchModules()
        fetchInscriptions()
        fetchTeachers()
        fetchUsers()
        fetchContents()
        setFilteredData({
            users: users,
            modules: modules,
            courses: courses,
            exercises: exercises,
            teachers: teachers,
            contents: contents
        });
    }

    const handleOpenCreate = () => {
        setOpenCreate(!openCreate)
    }
    const handleOpenCreateModule = () => {
        setOpenCreateModule(!openCreateModule)
    }
    const handleOpenCreateCourse = () => {
        setOpenCreateCourse(!openCreateCourse)
    }
    const handleOpenCreateStudent = () => {
        setOpenCreateStudent(!openCreateStudent)
    }
    const handleOpenCreateTeacher = () => {
        setOpenCreateTeacher(!openCreateTeacher)
    }
    const handleOpenCreateContent = () => {
        setOpenCreateContent(!openCreateContent)
    }
    const handleEnableCourse = () => {
        setEnableCourse(true)
        setEnableExercise(false)
        setEnableModule(false)
        setEnableStudent(false)
        setEnableTeacher(false)
        setEnableContent(false)
    }
    const handleEnableExercise = () => {
        setEnableExercise(true)
        setEnableCourse(false)
        setEnableModule(false)
        setEnableStudent(false)
        setEnableTeacher(false)
        setEnableContent(false)
    }
    const handleEnableModule = () => {
        setEnableModule(true)
        setEnableCourse(false)
        setEnableExercise(false)
        setEnableStudent(false)
        setEnableTeacher(false)
        setEnableContent(false)
    }
    const handleEnableStudent = () => {
        setEnableStudent(true)
        setEnableCourse(false)
        setEnableExercise(false)
        setEnableModule(false)
        setEnableTeacher(false)
        setEnableContent(false)
    }
    const handleEnableTeacher = () => {
        setEnableTeacher(true)
        setEnableStudent(false)
        setEnableCourse(false)
        setEnableExercise(false)
        setEnableModule(false)
        setEnableContent(false)
    }
    const handleEnableContent = () => {
        setEnableContent(true)
        setEnableTeacher(false)
        setEnableStudent(false)
        setEnableCourse(false)
        setEnableExercise(false)
        setEnableModule(false)
    }

    const handleSearch = async (event) => {
        const { value } = event.target;

        if (!value || value.trim() === "" || value === null || value === undefined) {
            setFilteredData({
                users: users,
                modules: modules,
                courses: courses,
                exercises: exercises,
                teachers: teachers,
                contents: contents
            });
        } else {
            const lowercasedValue = value.toLowerCase();

            const filteredUsers = users.filter((usuario) => {
                const dniAsString = String(usuario.dni);
                const name = String(usuario.name).toLowerCase();
                const surname = String(usuario.surname).toLowerCase();
                const email = String(usuario.email).toLowerCase();
                const idRol = String(usuario.id_rol);

                const lowercasedValue = value.toLowerCase();

                const basicFilter =
                    dniAsString.includes(lowercasedValue) ||
                    name.includes(lowercasedValue) ||
                    surname.includes(lowercasedValue) ||
                    email.includes(lowercasedValue);

                const roleFilter =
                    (lowercasedValue === "profesor" && idRol.includes("2")) ||
                    (lowercasedValue === "estudiante" && idRol.includes("1"));

                return basicFilter || roleFilter;
            });

            const filteredTeachers = users.filter((usuario) => {
                const dniAsString = String(usuario.dni);
                const name = String(usuario.name).toLowerCase();
                const surname = String(usuario.surname).toLowerCase();
                const email = String(usuario.email).toLowerCase();
                const idRol = String(usuario.id_rol);

                const lowercasedValue = value.toLowerCase();

                const basicFilter =
                    dniAsString.includes(lowercasedValue) ||
                    name.includes(lowercasedValue) ||
                    surname.includes(lowercasedValue) ||
                    email.includes(lowercasedValue);

                const roleFilter =
                    (lowercasedValue === "profesor" && idRol.includes("2")) ||
                    (lowercasedValue === "estudiante" && idRol.includes("1"));

                return basicFilter || roleFilter;
            });

            const filteredModules = modules.filter((module) => {
                const moduleName = module.name.toLowerCase();
                return moduleName.includes(lowercasedValue);
            });

            const filteredCourses = courses.filter((course) => {
                const courseName = course.name.toLowerCase();
                return courseName.includes(lowercasedValue);
            });

            const filteredExercises = exercises.filter((exercise) => {
                const exerciseName = exercise.name.toLowerCase();
                return exerciseName.includes(lowercasedValue);
            });

            const filteredContents = contents.filter((content) => {
                const contentName = content.title.toLowerCase();
                return contentName.includes(lowercasedValue)
            })

            setFilteredData({
                users: filteredUsers,
                modules: filteredModules,
                courses: filteredCourses,
                exercises: filteredExercises,
                teachers: filteredTeachers,
                contents: filteredContents
            });
        }
    };

    return (
        <main className="w-full">
            <div className="mx-auto max-w-screen-xl px-4 lg:p-12">
                <div className="bg-white  relative shadow-md sm:rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                        <div className="w-full md:w-1/2">
                            <form className="flex items-center">
                                <label for="simple-search" className="sr-only">Buscar</label>
                                <div className="relative w-full">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2   dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Buscar" onChange={handleSearch} defaultValue="" required="" />                                   
                                </div>
                                <div className="ml-2 p-1 bg-amber-400 text-black rounded-md">
                                    <button onClick={handleRefresh} type="button"><RefreshSvg/></button>
                                </div>
                            </form>
                        </div>
                        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">

                            {
                                enableExercise ? <button type="button" id="createProductModalButton" data-modal-target="createProductModal" data-modal-toggle="createProductModal"
                                    className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                                    onClick={handleOpenCreate}>
                                    <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clipRule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                    </svg>
                                    Agregar ejercicio
                                </button> : null
                            }
                            {
                                enableModule ? <button type="button" id="createProductModalButton" data-modal-target="createProductModal" data-modal-toggle="createProductModal"
                                    className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                                    onClick={handleOpenCreateModule}>
                                    <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clipRule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                    </svg>
                                    Agregar módulo
                                </button> : null
                            }
                            {
                                enableCourse ? <button type="button" id="createProductModalButton" data-modal-target="createProductModal" data-modal-toggle="createProductModal"
                                    className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                                    onClick={handleOpenCreateCourse}>
                                    <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clipRule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                    </svg>
                                    Agregar curso
                                </button> : null
                            }
                            {
                                enableStudent ? <button type="button" id="createProductModalButton" data-modal-target="createProductModal" data-modal-toggle="createProductModal"
                                    className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                                    onClick={handleOpenCreateStudent}>
                                    <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clipRule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                    </svg>
                                    Inscribir estudiante
                                </button> : null
                            }
                            {
                                enableTeacher ? <button type="button" id="createProductModalButton" data-modal-target="createProductModal" data-modal-toggle="createProductModal"
                                    className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                                    onClick={handleOpenCreateTeacher}>
                                    <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clipRule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                    </svg>
                                    Asignar como profesor
                                </button> : null
                            }
                            {
                                enableContent ? <button type="button" id="createProductModalButton" data-modal-target="createProductModal" data-modal-toggle="createProductModal"
                                    className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                                    onClick={handleOpenCreateContent}>
                                    <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clipRule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                    </svg>
                                    Agregar contenido
                                </button> : null
                            }
                            <div className="flex items-center space-x-3 w-full md:w-auto relative">

                                <button
                                    id="actionsDropdownButton"
                                    data-dropdown-toggle="actionsDropdown"
                                    className="w-full md:w-auto flex items-center justify-center py-2 px-4 font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700   dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    type="button"
                                    onClick={() => setOpenActions(!openActions)}
                                >
                                    <svg
                                        className="-ml-1 mr-1.5 w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <path
                                            clipRule="evenodd"
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        />
                                    </svg>
                                    Acciones
                                </button>

                                <div id="actionsDropdown"
                                    className={`${openActions ? "block" : "hidden"
                                        } z-10 absolute top-8  mt-2 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:divide-gray-600`}>
                                    <ul className=" text-sm text-gray-700 " aria-labelledby="actionsDropdownButton">
                                        <li>
                                            <button onClick={handleEnableCourse} className="block w-full text-left py-1 px-4 hover:bg-gray-600 hover:text-white">Cursos</button>
                                        </li>

                                    </ul>
                                    <ul className=" text-sm text-gray-700 " aria-labelledby="actionsDropdownButton">
                                        <li>
                                            <button onClick={handleEnableModule} className="block w-full text-left py-1 px-4 hover:bg-gray-600 hover:text-white">Módulos</button>
                                        </li>

                                    </ul>
                                    <ul className=" text-sm text-gray-700 " aria-labelledby="actionsDropdownButton">
                                        <li>
                                            <button onClick={handleEnableExercise} className="block w-full text-left py-1 px-4 hover:bg-gray-600 hover:text-white">Ejercicios</button>
                                        </li>
                                    </ul>
                                    <ul className=" text-sm text-gray-700 " aria-labelledby="actionsDropdownButton">
                                        <li>
                                            <button onClick={handleEnableStudent} className="block w-full text-left py-1 px-4 hover:bg-gray-600 hover:text-white">Estudiantes</button>
                                        </li>
                                    </ul>
                                    <ul className=" text-sm text-gray-700 " aria-labelledby="actionsDropdownButton">
                                        <li>
                                            <button onClick={handleEnableTeacher} className="block w-full text-left py-1 px-4 hover:bg-gray-600 hover:text-white">Profesores</button>
                                        </li>
                                    </ul>
                                    <ul className=" text-sm text-gray-700 " aria-labelledby="actionsDropdownButton">
                                        <li>
                                            <button onClick={handleEnableContent} className="block w-full text-left py-1 px-4 hover:bg-gray-600 hover:text-white">Contenidos</button>
                                        </li>
                                    </ul>

                                </div>
                                {/* <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown" className="w-full md:w-auto flex items-center justify-center py-2 px-4 font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700   dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4 mr-2 text-gray-400" viewbox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                                    </svg>
                                    Filtrar
                                    <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clipRule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                    </svg>
                                </button> */}
                                <div id="filterDropdown" className="z-10 hidden w-56 p-3 bg-white rounded-lg shadow  ">
                                    <h6 className="mb-3 text-sm font-medium text-gray-900  ">Category</h6>
                                    <ul className="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
                                        <li className="flex items-center">
                                            <input id="apple" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label for="apple" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Apple (56)</label>
                                        </li>
                                        <li className="flex items-center">
                                            <input id="fitbit" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label for="fitbit" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Fitbit (56)</label>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        {
                            enableExercise ? <ExerciseTable exercises={filteredData.exercises}
                                openCreate={openCreate}
                                handleOpenCreate={handleOpenCreate}
                                handleRefresh={handleRefresh}
                            /> : null
                        }
                        {
                            enableCourse ? <CourseTable courses={filteredData.courses}
                                openCreate={openCreateCourse}
                                handleOpenCreateCourse={handleOpenCreateCourse}
                                handleRefresh={handleRefresh}
                            /> : null
                        }
                        {
                            enableModule ? <ModuleTable modules={filteredData.modules}
                                openCreate={openCreateModule}
                                handleOpenCreate={handleOpenCreateModule}
                                handleRefresh={handleRefresh}
                            /> : null
                        }
                        {
                            enableStudent ? <StudentTable inscriptions={inscriptions} //students={filteredUsers}
                                openCreate={openCreateStudent}
                                handleOpenCreate={handleOpenCreateStudent}
                                handleRefresh={handleRefresh}
                            /> : null
                        }
                        {
                            enableTeacher ? <TeacherTable teachers={filteredData.teachers}
                                openCreate={openCreateTeacher}
                                handleOpenCreate={handleOpenCreateTeacher}
                                handleRefresh={handleRefresh}
                            /> : null
                        }
                        {
                            enableContent ? <ContentTable contents={filteredData.contents}
                                openCreate={openCreateContent}
                                handleOpenCreate={handleOpenCreateContent}
                                handleRefresh={handleRefresh}
                            /> : null
                        } 
                    </div>
                </div>
            </div>
        </main>
    )
}