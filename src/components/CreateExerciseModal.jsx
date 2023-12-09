"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import Swal from 'sweetalert2'

const baseURL = "http://localhost:4001/api/exercises";
const multipleURL = "http://localhost:4001/api/multiple"
const trueOrFalseURL = "http://localhost:4001/api/true_false"
export default function UpdateModal({ isOpen, onClose, handleRefresh }) {
    const [modules, setModules] = useState([])
    const [exerciseType, setExerciseType] = useState([])
    const [courses, setCourses] = useState([])
    const [exerciseData, setExerciseData] = useState({
        name: "",
        instruction: "",
        id_type: 0,
        id_module: 0
    })
    const [formData, setFormData] = useState({
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        correctOption1: false,
        correctOption2: false,
    });

    const [formData2, setFormData2] = useState({
        true_option: "",
        false_option: ""
    })

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

        fetchCourses()
        fetchTypes()
    }, [])

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
        console.log(formData2);
        const multipleBody = {
            options: [
                { text: formData.option1, correct: true },
                { text: formData.option2, correct: formData.correctOption2 },
                { text: formData.option3, correct: false },
                { text: formData.option4, correct: false },
            ],
        };
        if (exerciseData.name !== undefined && exerciseData.name.trim() !== "" && exerciseData.id_module !== 0 && exerciseData.id_module !== undefined &&
            exerciseData.id_type !== 0 && exerciseData.id_type !== undefined && exerciseData.instruction !== undefined && exerciseData.instruction.trim() !== "") {
            if (exerciseData.id_type == 1 && formData.option1 !== undefined && formData.option1.trim() !== "" && formData.option2 !== undefined && formData.option2.trim() !== "" &&
                formData.option3 !== undefined && formData.option3.trim() !== "" && formData.option4 !== undefined && formData.option4.trim() !== "") {
                const createExerciseResponse = await axios.post(baseURL, exerciseData);
                if (createExerciseResponse.status === 200) {
                    try {
                        const multipleResponse = await axios.post(multipleURL, {
                            id_exercise: await createExerciseResponse.data.id_exercise,
                            options: multipleBody.options
                        })
                        alert('Ejercicio multiple choise agregado correctamente')
                        console.log('Multiple response', multipleResponse.data);
                        handleRefresh()
                        onClose()
                    } catch (error) {
                        console.log('MULTIPLE ERROR', error);
                    }
                } else {
                    alert('error')
                }
            } else if (exerciseData.id_type == 2 && formData2.true_option !== undefined && formData2.true_option.trim() !== "" && formData2.false_option !== undefined && formData2.false_option.trim() !== "") {
                try {
                    const createExerciseResponse = await axios.post(baseURL, exerciseData);
                    if (createExerciseResponse.status === 200) {
                        try {
                            const trueOrFalseResponse = await axios.post(trueOrFalseURL, {
                                id_exercise: await createExerciseResponse.data.id_exercise,
                                true_option: formData2.true_option,
                                false_option: formData2.false_option
                            })
                            console.log(formData2);
                            console.log(trueOrFalseResponse);
                            if (trueOrFalseResponse.status === 200) {
                                alert('Ejercicio verdadero o falso agregado correctamente')
                                handleRefresh()
                                onClose()
                            }
                        } catch (error) {
                            console.log('TRUE OR FALSE', error);
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            else {
                console.log('AQUI');
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
                Toast.fire({
                    icon: "error",
                    title: "Llena todos los campos!"
                });
            }
        } else {
            console.log('AQYUS');
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
            Toast.fire({
                icon: "error",
                title: "Llena todos los campos!"
            });
        }

    }
    // const Toast = Swal.mixin({
    //     toast: true,
    //     position: "bottom-end",
    //     showConfirmButton: false,
    //     timer: 3000,
    //     timerProgressBar: true,
    //     didOpen: (toast) => {
    //         toast.onmouseenter = Swal.stopTimer;
    //         toast.onmouseleave = Swal.resumeTimer;
    //     }
    // });
    // Toast.fire({
    //     icon: "error",
    //     title: "Llena todos los campos!"
    // });
    return (
        <div className={`${isOpen ? '' : 'hidden'} overflow-y-auto overflow-x-hidden fixed inset-0 flex  z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
            role="dialog"
            aria-labelledby="modal-title"
            aria-describedby="modal-description">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 " id="modal-title">Crear ejercicio</h3>
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

                            <div className="sm:col-span-2">
                                <label for="instruction" className="block mb-2 text-sm font-medium text-gray-900">Consigna</label>
                                <textarea id="instruction" aria-describedby="modal-description" rows="3"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border   border-gray-600 placeholder-gray-400   focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="Escribe la consigna..." value={exerciseData.instruction} onChange={(e) => setExerciseData({ ...exerciseData, instruction: e.target.value })}></textarea>
                            </div>

                            <div>
                                <label for="module" className="block mb-2 text-sm font-medium text-gray-900  ">Módulo</label>
                                <select id="module" onChange={(e) => setExerciseData({ ...exerciseData, id_module: parseInt(e.target.value) })} aria-describedby="modal-module" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5   dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option selected="" value={exerciseData.id_module}>Seleccione un módulo</option>
                                    {
                                        modules.length > 0 ? modules.map((module) => (
                                            <option value={module.id_module} key={module.id_module}>{module.name}</option>
                                        )) : null
                                    }
                                </select>
                            </div>
                            <div>
                                <label for="exercise_type" className="block mb-2 text-sm font-medium text-gray-900  ">Tipo de ejercicio</label>
                                <select id="exercise_type" onChange={(e) => setExerciseData({ ...exerciseData, id_type: parseInt(e.target.value) })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5   dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option selected="">Seleccione un tipo de ejercicio</option>
                                    {
                                        exerciseType.length > 0 ? exerciseType.map((type) => (
                                            <option value={type.id_type} key={type.id_type}>{type.name}</option>
                                        )) : null
                                    }
                                </select>
                            </div>
                            {
                                exerciseData.id_type == 1 ?
                                    <>
                                        <div>
                                            <div >
                                                <label htmlFor="option1" className="block mb-2 text-sm font-medium text-gray-900 ">Opción 1</label>
                                                <label htmlFor="correct1" className=" mb-2 text-sm font-medium text-gray-900 ">Correcta: </label>
                                                <input type="checkbox" checked={true} onChange={(e) => handleInputChange(e, 'correctOption1')} />
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
                                exerciseData.id_type == 2 ? <>
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
                            <button type="submit" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Agregar ejercicio</button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


