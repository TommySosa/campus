"use client"
import axios from "axios"
import { useEffect, useState } from "react"

export default function UpdateModuleModal({ isOpen, onClose, id_exercise }) {
    const baseURL = `http://localhost:4001/api/exercises/${id_exercise}`;
    const multipleURL = `http://localhost:4001/api/multiple/${id_exercise}`
    const trueOrFalseURL = `http://localhost:4001/api/true_false/${id_exercise}`
    const [modules, setModules] = useState([])
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
    const [enableModules, setEnableModules] = useState(false)
    const [exerciseData, setExerciseData] = useState({
        name: exercise.name,
        instruction: exercise.instruction,
        id_type: exercise.id_type
    })

    useEffect(() => {
        async function fetchCourses() {
            try {
                const response = await axios.get('/api/courses')
                const data = await response.data.data
                setCourses(data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchCourses()

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
        });
    }, [exercise]);

    const handleChangeCourse = (e) => {
        const id = e.target.value
        if (id > 0) {
            async function fetchModules() {
                try {
                    const response = await axios.get(`/api/modules/${id}`)
                    const data = response.data.data
                    setModules(data)
                } catch (error) {
                    console.log(error);
                }
            }
            fetchModules()
        }
    }

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
            const updateExerciseResponse = await axios.put(baseURL, exerciseData);
            console.log('response', updateExerciseResponse);
            if (updateExerciseResponse.status === 200) {
                if (exercise.id_type === 1) {
                    try {
                        const multipleResponse = await axios.put(multipleURL, {
                            id_exercise: await updateExerciseResponse.data.id_exercise,
                            options: multipleBody.options
                        })
                        alert('Ejercicio multiple choise agregado correctamente')
                        console.log('Multiple response', multipleResponse.data);
                    } catch (error) {
                        console.log('MULTIPLE ERROR', error);
                    }
                }
                else if (updateExerciseResponse.data.id_type === 2) {
                    try {
                        const trueOrFalseResponse = await axios.put(trueOrFalseURL, {
                            id_exercise: await updateExerciseResponse.data.id_exercise,
                            true_option: formData2.true_option,
                            false_option: formData2.false_option
                        })
                        alert('Ejercicio verdadero o falso agregado correctamente')
                        console.log('Verdadero o falso response', trueOrFalseResponse.data);
                    } catch (error) {
                        console.log('TRUE OR FALSE', error);
                    }
                }
                alert("Ejercicio agregado correctamente");
                // }
            } else {
                alert("Por favor, complete todos los campos");
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
                        <h3 className="text-lg font-semibold text-gray-900 " id="modal-title">Actualizar módulo</h3>
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
                            <div>
                                <label for="course" className="block mb-2 text-sm font-medium text-gray-900  ">Curso</label>
                                <select id="course" onChange={handleChangeCourse} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5   dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-primary-500 dark:focus:border-primary-500">
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
