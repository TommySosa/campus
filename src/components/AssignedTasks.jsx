"use client"
import React, { useState } from 'react';
import "firebase/storage";
import { storage } from "@/firebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import axios from 'axios';
import Swal from 'sweetalert2';

const TareaComponent = ({ task }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [feedBack, setFeedBack] = useState("")
    const [assignedData, setAssignedData] = useState({
        id_deliverable: 0,
        id_user: 0,
        approved: 0,
        done: 0,
        document_url: "",
        completed_at: ""
    })
    const [responseAssigned, setResponseAssigned] = useState()
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

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleFileChange = (event) => {
        if (event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        
            // Utilizar el id de la tarea para distinguir la carga del documento
            const imageRef = ref(storage, `/assigned/document-${task.id_assigned}-${Date.now()}`);
        
            uploadBytes(imageRef, event.target.files[0])
              .then(() => {
                getDownloadURL(imageRef)
                  .then((url) => {
                    setAssignedData({
                      ...assignedData,
                      document_url: url,
                    });
                    setFeedBack("Documento subido correctamente.");
                  })
                  .catch(() => {
                    setFeedBack("Hubo un error al subir la imagen.");
                  });
              })
              .catch(() => {
                setFeedBack("Hubo un error al subir el documento.");
              });
        } else {
            Toast.fire({
                icon: "error",
                title: "Seleccione un documento"
            });
        }
    };
    const dateFormatter = (date) => {
        let fecha = new Date(date);

        let day = fecha.getDate();
        let month = fecha.getMonth() + 1;
        let year = fecha.getFullYear();
        let hours = fecha.getHours();
        let min = fecha.getMinutes();

        let formattedHours = (hours < 10 ? '0' : '') + hours;
        let formattedMinutes = (min < 10 ? '0' : '') + min;

        let dateFormatted = day + '/' + (month < 10 ? '0' : '') + month + '/' + year + " " + formattedHours + ":" + formattedMinutes;
        return dateFormatted;
    };
    const obtenerFechaActualUTC = () => {
        const fechaActualUTC = new Date().toISOString();
        return fechaActualUTC;
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (assignedData.document_url === "") {
            Toast.fire({
                icon: "error",
                title: "Seleccione el documento a enviar!"
            })
        } else {
            const currentDate = new Date();

            // Obtener componentes de fecha y hora
            const year = currentDate.getFullYear();
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Sumar 1 porque los meses van de 0 a 11
            const day = currentDate.getDate().toString().padStart(2, '0');
            const hours = currentDate.getHours().toString().padStart(2, '0');
            const minutes = currentDate.getMinutes().toString().padStart(2, '0');
            const seconds = currentDate.getSeconds().toString().padStart(2, '0');

            // Formatear la fecha en el formato deseado (YYYY-MM-DD HH:MM:SS)
            const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            setAssignedData({
                ...assignedData,
                id_deliverable: task.id_deliverable,
                done: true,
                id_user: task.id_user,
                completed_at: formattedDate
            })
            try {
                console.log(assignedData);
                console.log(formattedDate);
                const response = await axios.patch(`http://localhost:4001/api/mark-completed/${task.id_assigned}`, assignedData)
                console.log(response);
                setResponseAssigned(response.data)
                if (response.status === 200) {
                    Toast.fire({
                        icon: "success",
                        title: "Tarea enviada correctamente"
                    })
                }
            } catch (error) {
                Toast.fire({
                    icon: "error",
                    title: "Ocurrió un error"
                })
                console.log(error);
            }
        }
    }

    return (
        <div className="border p-4 mb-4">
            <h2 className="text-lg font-bold mb-2">{task.title}</h2>
            <p className={`flex justify-end mr-6 ${task.deadline < obtenerFechaActualUTC() ? 'text-red-500' : ''}`}>
                FECHA LIMITE: {dateFormatter(task.deadline)}
            </p>
            <p className="mb-4">{task.instruction}</p>

            {task.pdf_url && (
                <div className='flex justify-center'>
                    <iframe
                        src={`${task.pdf_url}`}
                        type="application/pdf"
                        width="70%"
                        height="150px"
                    />
                </div>
            )}
            <button onClick={openModal} className="w-full h-full rounded-md overflow-hidden focus:outline-none">
                Ver
            </button>
            {modalIsOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75">
                    <div className="w-3/4 h-3/4 overflow-hidden bg-white p-4 rounded-md">
                        <button onClick={closeModal} className="absolute top-4 right-4 text-white focus:outline-none">
                            Cerrar
                        </button>
                        <iframe
                            className="w-full h-full"
                            src={task.pdf_url}
                            title="PDF Preview"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
            <div className="mt-4">
                <label htmlFor="adjuntarArchivo" className="cursor-pointer">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6 inline-block mr-2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 5l-8 8-4-4 1.5-1.5L12 8l7.5 7.5L20 12l-8-8z"
                        />
                    </svg>
                    Adjuntar Documento
                </label>
                <p>{feedBack}</p>
                <input
                    id="adjuntarArchivo"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>
            {selectedFile && (
                <p className="mt-2 text-gray-600">Archivo adjunto: {selectedFile.name}</p>
            )}
            {
                task.deadline < obtenerFechaActualUTC() ? <button type='button' className='bg-red-400 rounded-lg px-3 py-2'>Ya pasó la fecha de entrega.</button> : <button type='button' className='bg-green-400 rounded-lg px-3 py-2' onClick={handleSubmit}>Marcar como hecho</button>
            }
        </div>
    );
};

export default TareaComponent;


