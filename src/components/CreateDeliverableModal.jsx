"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import "firebase/storage";
import { storage } from "@/firebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import Swal from "sweetalert2";

const baseURL = "http://localhost:4001/api/deliverable";
export default function CreateContentModal({ isOpen, onClose, handleRefresh }) {
    const [courses, setCourses] = useState([])
    const [selectedFile, setSelectedFile] = useState(null)
    const [feedBack, setFeedBack] = useState("")
    const [deliverableData, setDeliverableData] = useState({
        title: "",
        instruction: "",
        pdf_url: "",
        id_course: 0,
        deadline: null
    })
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
    }, [])

    const handleFileChange = (event) => {
        if (event.target.files[0]) {
            const imageRef = ref(storage, `/deliverables/pdf-${Date.now()}`)
            uploadBytes(imageRef, event.target.files[0]).then(() => {
                getDownloadURL(imageRef).then((url) => {
                    setDeliverableData({
                        ...deliverableData,
                        pdf_url: url,
                    });
                    setFeedBack("PDF subido correctamente.")
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
            Toast.fire({
                icon: "error",
                title: "Seleccione una foto"
            })
            console.log('Seleccione la foto');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (deliverableData.id_course == 0 || deliverableData.instruction == "" || deliverableData.pdf_url == "" || deliverableData.title == "") {
            Toast.fire({
                icon: "error",
                title: "Llená todos los campos!"
            })
        } else {
            try {
                const createDeliverableResponse = await axios.post(baseURL, deliverableData);
                if (createDeliverableResponse.status === 200) {
                    Toast.fire({
                        icon: "success",
                        title: "Entregable agregado correctamente."
                    });
                    handleRefresh()
                    onClose()
                }
            } catch (error) {
                Toast.fire({
                    icon: "error",
                    title: "Ocurrió un error"
                })
                console.error("Error al agregar el entregable: ", error);
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
                        <h3 className="text-lg font-semibold text-gray-900 " id="modal-title">Crear entregable</h3>
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
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Titulo</label>
                                <input type="text" name="title" id="title"
                                    className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5  border-gray-600 dark:placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="Escribe el titulo..." value={deliverableData.title} onChange={(e) => setDeliverableData({ ...deliverableData, title: e.target.value })} />
                            </div>
                            <div>
                                <label htmlFor="exercise_type" className="block mb-2 text-sm font-medium text-gray-900  ">Curso </label>
                                <select id="exercise_type" onChange={(e) => setDeliverableData({ ...deliverableData, id_course: parseInt(e.target.value) })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5   dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option selected="">Seleccione un curso</option>
                                    {
                                        courses.length > 0 ? courses.map((course) => (
                                            <option value={course.id_course} key={course.id_course}>{course.name}</option>
                                        )) : null
                                    }
                                </select>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="deadline" className="block mb-2 text-sm font-medium text-gray-900">Fecha límite</label>
                                <input type="datetime-local" name="deadline" id="deadline" 
                                className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5  border-gray-600 dark:placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500"
                                onChange={(e) => setDeliverableData({ ...deliverableData, deadline: e.target.value })}
                                />
                            </div>

                            {/* Documento */}
                            <div className="sm:col-span-2">
                                <label htmlFor="url_image" className="block mb-2 text-sm font-medium text-gray-900 ">Documento</label>
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
                                            <p className="text-xs text-gray-500 dark:text-gray-400">PDF</p>
                                        </div>
                                        <input id="dropzone-file" type="file" accept="application/pdf" className="hidden w-full" onChange={handleFileChange} />
                                    </label>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                {feedBack}
                                <label for="instruction" className="block mb-2 text-sm font-medium text-gray-900">Consigna</label>
                                <textarea id="instruction" aria-describedby="modal-description" rows="3"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-600 placeholder-gray-400   focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="Escribe la consigna..." value={deliverableData.instruction} onChange={(e) => setDeliverableData({ ...deliverableData, instruction: e.target.value })}></textarea>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button type="submit" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Agregar entregable</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


