"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function ToCorrect({ id_course }) {
    const [completed, setCompleted] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [markedCompleted, setMarkedCompleted] = useState(false);

    useEffect(() => {
        async function fetchTasksCompleted() {
            try {
                const response = await axios.get(`http://localhost:4001/api/completed/${id_course}`);
                const data = await response.data;
                console.log(data);
                setCompleted(data);
                setCurrentIndex(0); // Inicializar el índice al principio
                setMarkedCompleted(false); // Reiniciar el estado al cargar nuevas tareas
            } catch (error) {
                console.log(error);
            }
        }
        fetchTasksCompleted();
    }, [id_course, markedCompleted]);


    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleAprobado = async (id_assigned) => {
        try {
            await axios.patch(`http://localhost:4001/api/mark-corrected/${id_assigned}`, {
                approved: true,
                corrected: true,
            });
            // Avanzar al siguiente
            setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, completed.length - 1));
            setMarkedCompleted(true);
        } catch (error) {
            console.error('Error al marcar como aprobado:', error);
        }
    };

    const handleDesaprobado = async (id_assigned) => {
        try {
            await axios.patch(`http://localhost:4001/api/mark-corrected/${id_assigned}`, {
                approved: false,
                corrected: true,
            });
            // Avanzar al siguiente
            setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, completed.length - 1));
            setMarkedCompleted(true);
        } catch (error) {
            console.error('Error al marcar como desaprobado:', error);
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

    return (
        <div className="border p-4 mb-4">
            {completed && completed.length > 0 && currentIndex <= completed.length - 1 && !markedCompleted ? (
                <>
                    <h2 className="text-lg font-bold mb-2">Entrega de: {completed[currentIndex].name + ' ' + completed[currentIndex].surname}</h2>
                    <p className="font-bold mb-2">El día: {dateFormatter(completed[currentIndex].completed_at)}</p>
                    <div className="mb-4">
                        <iframe title="PDF Previsualización" width="100%" height="500px" src={completed[currentIndex].document_url}></iframe>
                    </div>
                    <button onClick={openModal} className="w-full h-full rounded-md overflow-hidden focus:outline-none mb-2">
                        Ver
                    </button>
                    {modalIsOpen && (
                        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75">
                            <div className="w-3/4 h-3/4 overflow-hidden bg-white p-4 rounded-md">
                                <button onClick={closeModal} className="absolute top-4 right-4 text-white focus:outline-none">
                                    Cerrar
                                </button>
                                <iframe className="w-full h-full" src={completed[currentIndex].pdf_url} title="PDF Preview" allowFullScreen></iframe>
                            </div>
                        </div>
                    )}

                    <div className="mb-4">
                        <button className="bg-green-500 text-white px-4 py-2 mr-2 " onClick={() => handleAprobado(completed[currentIndex].id_assigned)}>
                            Aprobado
                        </button>
                        <button className="bg-red-500 text-white px-4 py-2 " onClick={() => handleDesaprobado(completed[currentIndex].id_assigned)}>
                            Desaprobado
                        </button>
                    </div>
                </>
            ) : (
                <p>{markedCompleted ? 'Esta tarea ya fue marcada como completada.' : 'No hay nada para corregir'}</p>
            )}
        </div>
    );
}