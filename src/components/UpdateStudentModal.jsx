"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

export default function UpdateStudentModal({ isOpen, onClose, handleRefresh, id_student_course }) {
    const [courses, setCourses] = useState([])
    const [studentData, setStudentData] = useState()
    const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    useEffect(() => {
        async function fetchCourses() {
            try {
                const response = await axios.get(`http://localhost:4001/api/courses`)
                const data = await response.data
                setCourses(data)
            } catch (error) {
                console.log(error);
            }
        }
        
        fetchCourses()
    }, [id_student_course])

    useEffect(()=> {
        async function fetchInscription(){
            try {
                const response = await axios.get(`http://localhost:4001/api/inscription/${id_student_course}`)
                const data = await response.data
                setStudentData(data)
            } catch (error) {
                console.log('error', error);
            }
        }
        fetchInscription()

    }, [id_student_course])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(studentData.id_user == 0 || studentData.id_course == 0 || studentData.id_course == NaN || studentData.id_course == undefined){
            Toast.fire({
                icon: "error",
                title: "Llena todos los campos!"
            });
        }else{
            try {
                const createCourseResponse = await axios.put(`http://localhost:4001/api/students/${id_student_course}`,{
                    id_user: studentData.id_user,
                    id_course: studentData.id_course
                });
                if (createCourseResponse.status === 200) {
                    handleRefresh()
                    onClose()
                    Toast.fire({
                        icon: "success",
                        title: "Inscripción actualizada correctamente."
                    });
                }
            } catch (error) {
                Toast.fire({
                    icon: "error",
                    title: "Ocurrió un error."
                });
                console.error("Error al inscribir el estudiante: ", error);
            }
        }
    }

    return (
        <div className={`${isOpen ? '' : 'hidden'} overflow-y-auto overflow-x-hidden fixed inset-0 flex  z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
            role="dialog"
            aria-labelledby="modal-title"
            aria-describedby="modal-description">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 " id="modal-title">Editar inscripción</h3>
                        <button onClick={onClose} type="button" className="text-gray-400 bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            <button className="sr-only">Cerrar modal</button>
                        </button>
                    </div>

                    <div>
                        <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">Nombre</label>
                        <input type="text" name="name" id="name" disabled
                            className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5  border-gray-600 dark:placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Escribe el nombre..." value={studentData ? studentData.name + " " + studentData.surname : ""} />
                    </div>

                    <form onSubmit={handleSubmit} aria-labelledby="modal-title">
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                            <div>
                                <label for="course" className="block mb-2 text-sm font-medium text-gray-900  ">Curso</label>
                                <select id="course" value={studentData ? studentData.id_course : 0 } onChange={(e) => setStudentData({ ...studentData, id_course: parseInt(e.target.value) })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5   dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-primary-500 dark:focus:border-primary-500">
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
                            <button type="submit" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Inscribir</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


