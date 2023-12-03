"use client"
import axios from "axios"
import { useEffect, useState } from "react"

const baseURL = "http://localhost:4001/api/modules";
export default function CreateStudentModal({ isOpen, onClose, handleRefresh }) {
    const [courses, setCourses] = useState([])
    const [users, setUsers] = useState([])
    const [studentData, setStudentData] = useState({
        // name: "",
        // surname: "",
        // email: "",
        // dni: ""
        id_user: 0,
        id_course: 0
    })
    const [user, setUser] = useState({
        name: "",
        surname: "",
        email: "",
        dni: "",
    })
    const [filteredUsers, setFilteredUsers] = useState()

    useEffect(() => {
        async function fetchCourses() {
            try {
                const response = await axios.get(`http://localhost:4001/api/courses`)
                const data = await response.data
                console.log(data);
                setCourses(data)
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
        fetchCourses()
        fetchUsers()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const createCourseResponse = await axios.post(baseURL, studentData);
            console.log(createCourseResponse);
            if (createCourseResponse.status === 200) {
                handleRefresh()
            }

        } catch (error) {
            console.error("Error al inscribir el estudiante: ", error);
        }
    }

    const handleSearch = async(event) => {
        const { value } = event.target;
        setUser({ dni: value });
      
        // Filtrar los usuarios según el DNI
        const filtered = users.filter((usuario) => {
          // Asegúrate de convertir el DNI a cadena antes de realizar la comparación
          const dniAsString = String(usuario.dni);
          
          // Convertir a minúsculas para búsqueda insensible a mayúsculas y minúsculas
          const lowercasedValue = value.toLowerCase();
          
          return dniAsString.includes(lowercasedValue);
        });
      
        // Mostrar el resultado en la consola
        console.log(filtered);
        setFilteredUsers(filtered)
        // const response = await axios.get(`http://localhost:4001/api/user/${user.dni}`)
        // console.log(response.data);
      };
      

    return (
        <div className={`${isOpen ? '' : 'hidden'} overflow-y-auto overflow-x-hidden fixed inset-0 flex  z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
            role="dialog"
            aria-labelledby="modal-title"
            aria-describedby="modal-description">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 " id="modal-title">Inscribir estudiante</h3>
                        <button onClick={onClose} type="button" className="text-gray-400 bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            <button className="sr-only">Cerrar modal</button>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} aria-labelledby="modal-title">
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                            <div>
                                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">DNI</label>
                                <input type="text" name="name" id="name"
                                    className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5  border-gray-600 dark:placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="Buscar..." value={user.dni} onChange={handleSearch} />
                            </div>
                            <div>
                                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">Nombre</label>
                                <input type="text" name="name" id="name"
                                    className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5  border-gray-600 dark:placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="Buscar..." value={filteredUsers ? filteredUsers[0].name : ""}  />
                            </div>
                            <div>
                                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">Apellido</label>
                                <input type="text" name="name" id="name"
                                    className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5  border-gray-600 dark:placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="Buscar..." value={filteredUsers ? filteredUsers[0].surname : ""}   />
                            </div>
                            <div>
                                <label for="course" className="block mb-2 text-sm font-medium text-gray-900  ">Usuarios</label>
                                <select id="course" onChange={(e) => setStudentData({ ...studentData, id_user: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5   dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option selected="">Seleccione un usuario</option>
                                    {
                                        users.length > 0 ? users.map((user) => (
                                            <option value={user.id_user} key={user.id_user}>{user.name} {user.surname}</option>
                                        )) : null
                                    }
                                </select>
                            </div>
                            <div>
                                <label for="course" className="block mb-2 text-sm font-medium text-gray-900  ">Curso</label>
                                <select id="course" onChange={(e) => setStudentData({ ...studentData, id_course: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5   dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option selected="">Seleccione un curso</option>
                                    {
                                        courses.length > 0 ? courses.map((course) => (
                                            <option value={course.id_course} key={course.id_course}>{course.name}</option>
                                        )) : null
                                    }
                                </select>
                            </div>

                        </div>
                        <div className="flex items-center space-x-4">
                            <button type="submit" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Agregar módulo</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


