"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import "firebase/storage";
import { storage } from "@/firebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const baseURL = "http://localhost:4001/api/courses";
export default function UpdateCourseModal({ isOpen, onClose, handleRefresh }) {
    const [categories, setCategories] = useState([])
    const [teachers, setTeachers] = useState([])
    const [selectedFile, setSelectedFile] = useState(null)
    const [feedBack, setFeedBack] = useState("")
    const [courseData, setCourseData] = useState({
        name: "",
        description: "",
        url_image: "",
        id_category: 0,
        id_user: 0
    })

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await axios.get(`http://localhost:4001/api/category`)
                const data = await response.data
                console.log(data);
                setCategories(data)
            } catch (error) {
                console.log(error);
            }
        }

        async function fetchTeachers() {
            try {
                const response = await axios.get(`http://localhost:4001/api/teachers`)
                const data = await response.data
                setTeachers(data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchCategories()
        fetchTeachers()
    }, [])

    const handleFileChange = (event) => {
        if (event.target.files[0]) {
            const imageRef = ref(storage, `/image-${Date.now()}`)
            console.log(event.target.files[0]);
            uploadBytes(imageRef, event.target.files[0]).then(() => {
                getDownloadURL(imageRef).then((url) => {
                    setCourseData({
                        ...courseData,
                        url_image: url,
                    });
                    setFeedBack("Imágen subida correctamente.")
                })
                    .catch(() => {
                        setFeedBack("Húbo un error al subir la imágen.")
                    })
                setSelectedFile(null)
            }).catch(() => {
                console.log('error obteniendo la imagen');
                setFeedBack("Húbo un error al subir la imágen.")
            })
        } else {
            console.log('Seleccione la foto');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const createCourseResponse = await axios.post(baseURL, courseData);
            console.log(createCourseResponse);
            if(createCourseResponse.status === 200){
                handleRefresh()
            }

        } catch (error) {
            console.error("Error al agregar el ejercicio: ", error);
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
                        <h3 className="text-lg font-semibold text-gray-900 " id="modal-title">Crear curso</h3>
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
                                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 ">Nombre</label>
                                <input type="text" name="name" id="name"
                                    className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5  border-gray-600 dark:placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="Escribe el nombre..." value={courseData.name} onChange={(e) => setCourseData({ ...courseData, name: e.target.value })} />
                            </div>
                            <div>
                                <label for="course" className="block mb-2 text-sm font-medium text-gray-900  ">Categoria</label>
                                <select id="course" onChange={(e) => setCourseData({ ...courseData, id_category: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5   dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option selected="">Seleccione una categoria</option>
                                    {
                                        categories.length > 0 ? categories.map((category) => (
                                            <option value={category.id_category} key={category.category}>{category.name}</option>
                                        )) : null
                                    }
                                </select>
                            </div>

                            {/* IMAGEN */}
                            <div className="sm:col-span-2">
                                <label htmlFor="url_image" className="block mb-2 text-sm font-medium text-gray-900 ">Imagen del curso</label>
                                <div className="flex justify-center items-center w-full">
                                    <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 
                                    border-dashed cursor-pointer hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                                        <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                            <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 w-full">
                                                <span class="font-semibold text-center">Click para subir </span>
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                        <input id="dropzone-file" type="file" accept="image/*" className="hidden w-full" onChange={handleFileChange} />
                                    </label>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                {feedBack}
                                <label for="instruction" className="block mb-2 text-sm font-medium text-gray-900">Descripción</label>
                                <textarea id="instruction" aria-describedby="modal-description" rows="3"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-600 placeholder-gray-400   focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="Escribe la descripción..." value={courseData.description} onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}></textarea>
                            </div>

                            <div>
                                <label for="exercise_type" className="block mb-2 text-sm font-medium text-gray-900  ">Profesor asignado</label>
                                <select id="exercise_type" onChange={(e) => setCourseData({ ...courseData, id_user: parseInt(e.target.value) })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5   dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option selected="">Seleccione un profesor</option>
                                    {
                                        teachers.length > 0 ? teachers.map((teacher) => (
                                            <option value={teacher.id_user} key={teacher.id_user}>{teacher.name + " " + teacher.surname}</option>
                                        )) : null
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button type="submit" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Agregar curso</button>
                            <button type="button" className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                                <svg className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                Borrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


