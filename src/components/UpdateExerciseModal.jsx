"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import Swal from 'sweetalert2'

export default function UpdateModal({ isOpen, onClose, id_exercise, handleRefresh }) {
    const baseURL = `http://localhost:4001/api/exercises/${id_exercise}`;
    const multipleURL = `http://localhost:4001/api/multiple/${id_exercise}`
    const trueOrFalseURL = `http://localhost:4001/api/true_false/${id_exercise}`
    const [exerciseType, setExerciseType] = useState([])
    const [courses, setCourses] = useState([])
    const [exercise, setExercise] = useState({})
    const [multiple, setMultiple] = useState({
        id_exercise: 0,
        options: [
            { text: '', correct: false },
            { text: '', correct: false },
            { text: '', correct: false },
            { text: '', correct: false }
        ]
    })
    const [formData, setFormData] = useState({
        option1: multiple.options[0].text,
        option2: multiple.options[1].text,
        option3: multiple.options[2].text,
        option4: multiple.options[3].text,
        correctOption1: multiple.options[0].correct,
        correctOption2: multiple.options[1].correct,
    });
    const [exerciseData, setExerciseData] = useState({
        name: exercise.name,
        instruction: exercise.instruction,
        id_type: exercise.id_type
    })

    const [formData2, setFormData2] = useState({
        true_option: "",
        false_option: ""
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
        async function fetchTypes() {
            try {
                const response = await axios.get(`http://localhost:4001/api/exercise_types `)
                const data = response.data
                setExerciseType(data)
            } catch (error) {
                console.log(error);
            }
        }
        async function fetchCourses() {
            try {
                const response = await axios.get('/api/courses')
                const data = await response.data.data
                setCourses(data)
            } catch (error) {
                console.log(error);
            }
        }
        async function fetchExercise() {
            try {
                const response = await axios.get(`/api/exercises/${id_exercise}`)
                const data = response.data.data
                setExercise(data)
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        async function fetchMultiple() {
            try {
                const response = await axios.get(`/api/multiple/${id_exercise}`)
                const data = response.data.data
                setMultiple({
                    id_exercise: data.id_exercise,
                    options: data.options.map(option => ({ ...option }))
                });
            } catch (error) {
                console.log(error);
            }
        }
        async function fetchTrueOrFalse() {
            try {
                const response = await axios.get(`/api/trueFalse/${id_exercise}`)
                const data = await response.data.data
                console.log(data);
                setFormData2({
                    true_option: data.true_option,
                    false_option: data.false_option
                })
            } catch (error) {
                console.log(error);
            }
        }
        fetchCourses()
        fetchTypes()
        fetchExercise()
        fetchMultiple()
        fetchTrueOrFalse()
    }, [id_exercise])

    useEffect(() => {
        setFormData({
            option1: multiple.options[0].text,
            option2: multiple.options[1].text,
            option3: multiple.options[2].text,
            option4: multiple.options[3].text,
            correctOption1: multiple.options[0].correct,
            correctOption2: multiple.options[1].correct,
        });
    }, [multiple]);

    useEffect(() => {
        setExerciseData({
            name: exercise.name,
            instruction: exercise.instruction,
            id_type: exercise.id_type
        });
    }, [exercise]);

    const handleInputChange = (event, optionType) => {
        const isChecked = event.target.checked;

        setFormData({
            ...formData,
            [optionType]: isChecked,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const multipleBody = {
                options: [
                    { text: formData.option1, correct: formData.correctOption1 },
                    { text: formData.option2, correct: formData.correctOption2 },
                    { text: formData.option3, correct: false },
                    { text: formData.option4, correct: false },
                ],
            };
            console.log(formData);
            console.log(exerciseData);
            if (exerciseData.id_type !== 0 && exerciseData.id_type !== undefined && exerciseData.instruction.trim() !== "" && exerciseData.name.trim() !== "") {
                if (exercise.id_type === 1) {
                    if (formData.option1.trim() !== "" && formData.option2.trim() !== "" && formData.option3.trim() !== "" && formData.option4.trim() !== "") {
                        const updateExerciseResponse = await axios.put(baseURL, exerciseData);
                        if (updateExerciseResponse.status === 200) {
                            try {
                                const multipleResponse = await axios.put(multipleURL, {
                                    id_exercise: await updateExerciseResponse.data.id_exercise,
                                    options: multipleBody.options
                                })
                                Toast.fire({
                                    icon: "success",
                                    title: "Ejercicio actualizado correctamente."
                                });
                                onClose()
                                handleRefresh()
                            } catch (error) {
                                console.log('MULTIPLE ERROR', error);
                                Toast.fire({
                                    icon: "error",
                                    title: "Ocurrió un error."
                                });
                            }
                        } else {
                            alert('Error')
                            Toast.fire({
                                icon: "error",
                                title: "Ocurrió un error."
                            });
                        }
                    } else {
                        Toast.fire({
                            icon: "error",
                            title: "Llena todos los campos!"
                        });
                    }
                } else if (exercise.id_type === 2) {
                    if (formData2.true_option.trim() !== "" && formData2.false_option.trim() !== "") {
                        const updateExerciseResponse = await axios.put(baseURL, exerciseData);
                        if (updateExerciseResponse.status === 200) {
                            try {
                                const trueOrFalseResponse = await axios.put(trueOrFalseURL, {
                                    id_exercise: await updateExerciseResponse.data.id_exercise,
                                    true_option: formData2.true_option,
                                    false_option: formData2.false_option
                                })
                                onClose()
                                handleRefresh()
                                console.log('Verdadero o falso response', trueOrFalseResponse.data);
                            } catch (error) {
                                console.log('TRUE OR FALSE', error);
                            }
                        } else {
                            alert('Error')
                        }
                    } else {
                        Toast.fire({
                            icon: "error",
                            title: "Llena todos los campos!"
                        });
                    }
                } else {
                    Toast.fire({
                        icon: "error",
                        title: "Llena todos los campos!"
                    });
                }
                // }
            } else {
                Toast.fire({
                    icon: "error",
                    title: "Llena todos los campos!"
                });
            }
        } catch (error) {
            console.error("Error al agregar el ejercicio: ", error);
            Toast.fire({
                icon: "error",
                title: "Ocurrió un error."
            });
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
                        <h3 className="text-lg font-semibold text-gray-900 " id="modal-title">Actualizar ejercicio</h3>
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
                                    className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5  border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="Escribe el nombre..." value={exerciseData.name} onChange={(e) => setExerciseData({ ...exerciseData, name: e.target.value })} />
                            </div>

                            <div className="sm:col-span-2">
                                <label for="instruction" className="block mb-2 text-sm font-medium text-gray-900">Consigna</label>
                                <textarea id="instruction" aria-describedby="modal-description" rows="3"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border   border-gray-600 placeholder-gray-400   focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="Escribe la consigna..." value={exerciseData.instruction} onChange={(e) => setExerciseData({ ...exerciseData, instruction: e.target.value })}></textarea>
                            </div>
                            {
                                exercise.id_type == 1 ?
                                    <>
                                        <div>
                                            <div >
                                                <label htmlFor="option1" className="block mb-2 text-sm font-medium text-gray-900 ">Opción 1</label>
                                                <label htmlFor="correct1" className=" mb-2 text-sm font-medium text-gray-900 ">Correcta: </label>
                                                <input type="checkbox" checked={formData.correctOption1} onChange={(e) => handleInputChange(e, 'correctOption1')} />
                                                <textarea id="correct1" value={formData.option1} onChange={(e) => setFormData({ ...formData, option1: e.target.value })} rows="2" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500   dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Escribe la opción 1..."></textarea>
                                            </div>
                                        </div>
                                        <div>
                                            <div >
                                                <label htmlFor="option2" className="block mb-2 text-sm font-medium text-gray-900 ">Opción 2</label>
                                                <label htmlFor="correct2" className=" mb-2 text-sm font-medium text-gray-900 ">Correcta: </label>
                                                <input type="checkbox" id="correct2" checked={formData.correctOption2} onChange={(e) => handleInputChange(e, 'correctOption2')} />
                                                <textarea id="option2" value={formData.option2} onChange={(e) => setFormData({ ...formData, option2: e.target.value })} rows="2" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500   dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Escribe la opción 2..."></textarea>
                                            </div>
                                        </div>
                                        <div>
                                            <div >
                                                <label htmlFor="option3" className="block mb-2 text-sm font-medium text-gray-900 ">Opción 3</label>
                                                <textarea id="option3" value={formData.option3} onChange={(e) => setFormData({ ...formData, option3: e.target.value })} rows="2" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500   dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Escribe la opción 3..."></textarea>
                                            </div>
                                        </div>
                                        <div>
                                            <div >
                                                <label htmlFor="option4" className="block mb-2 text-sm font-medium text-gray-900 ">Opción 4</label>
                                                <textarea id="option4" value={formData.option4} onChange={(e) => setFormData({ ...formData, option4: e.target.value })} rows="2" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500   dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Escribe la opción 4..."></textarea>
                                            </div>
                                        </div>
                                    </> : null
                            }
                            {
                                exercise.id_type == 2 ? <>
                                    <div>
                                        <div >
                                            <label htmlFor="true_option" className="block mb-2 text-sm font-medium text-gray-900 ">Opción verdadera</label>
                                            <textarea id="true_option" value={formData2.true_option} onChange={(e) => setFormData2({ ...formData2, true_option: e.target.value })} rows="2" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500   dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Escribe la opción verdadera..."></textarea>
                                        </div>
                                    </div>
                                    <div>
                                        <div >
                                            <label htmlFor="false_option" className="block mb-2 text-sm font-medium text-gray-900 ">Opción falsa</label>
                                            <textarea id="false_option" value={formData2.false_option} onChange={(e) => setFormData2({ ...formData2, false_option: e.target.value })} rows="2" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500   dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Escribe la opción falsa..."></textarea>
                                        </div>
                                    </div>
                                </> : null
                            }


                        </div>
                        <div className="flex items-center space-x-4">
                            <button type="submit" className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">Actualizar ejercicio</button>
                            <button type="button" className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                                <svg className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
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
