"use client"

import axios from "axios"
import { useState, useEffect } from "react"
import Select from 'react-select';
export default function CreateExerciseForm() {
    const [formData, setFormData] = useState({
        name: "",
        instruction: "",
        id_module: "",
        id_type: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        correct1: false,
        correct2: false,
    });
    const [modules, setModules] = useState([]);
    const exercise_types = [
        { id: 1, name: "Multiple choise" },
        { id: 2, name: "Verdadero o falso" },
        { id: 3, name: "Completa la frase" },
        { id: 4, name: "Arrastra las palabras" },
    ];

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;

        // Si es un campo de checkbox, actualiza el estado correctamente
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleChangeType = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            id_type: e.value,
        }));
        console.log("e", e.value);
        console.log("id", formData.id_type);
    };
    const handleChangeModule = (e) => {
        const modulos = [
            { id: e.value, name: e.label },
        ]
        console.log("modulos", modulos);
        setFormData((prevData) => ({
            ...prevData,
            id_module: e.value,
        }));
    };

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/modules');
            const data = await response.json();
            setModules(data.data);
        }

        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const exerciseBody = {
            name: formData.name,
            instruction: formData.instruction,
            id_module: formData.id_module,
            id_type: formData.id_type,
        };

        const multipleBody = {
            options: [
                { text: formData.option1, correct: formData.correct1 },
                { text: formData.option2, correct: formData.correct2 },
                { text: formData.option3, correct: false },
                { text: formData.option4, correct: false },
            ],
        };
        console.log("exerciseBody", exerciseBody);
        console.log("multipleBody", multipleBody);
        console.log("modules", modules);

        try {
            const createExerciseResponse = await axios.post("http://localhost:3001/api/exercises", exerciseBody);

            if (createExerciseResponse.data.id_type === 1) {
                try {
                    const multipleResponse = await axios.post("http://localhost:3001/api/multiple", {
                        id_exercise: await createExerciseResponse.data.id_exercise,
                        options: multipleBody.options,
                    });
                    console.log("Multiple response", multipleResponse.data);
                } catch (error) {
                    console.log('IF MULTIPLE ERROR', error);
                }
            } else if (formData.id_type === "2") {
                // hacer lo mismo para verdadero o falso
            }

            console.log("Creación exitosa");
        } catch (error) {
            console.error("Error al enviar la solicitud POST:", error);
        }
    }

    return (
        <form className="flex flex-col w-2/3" id="exercises_form">
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" name="name"
                className="w-2/3 p-1 max-sm:w-full" placeholder="Nouns + prepositions 1.1" onChange={handleInputChange} value={formData.name} />
            <label htmlFor="instruction">Consigna</label>
            <input type="text" id="instruction" name="instruction"
                className="w-2/3 p-1 max-sm:w-full"
                placeholder="Elija el sustantivo correcto según la frase." onChange={handleInputChange} value={formData.instruction} />
            <label htmlFor="id_module">Módulo</label>
            <Select id="id_module" name="id_module"
                className="w-2/3 p-1 max-sm:w-full" onChange={handleChangeModule}
                options={modules.map(mod => ({ label: mod.name, value: mod.id_module }))}>

            </Select>
            <label htmlFor="id_type">Tipo</label>
            <Select id="id_type" name="id_type"
                className="w-2/3 p-1 max-sm:w-full" onChange={handleChangeType}
                options={exercise_types.map(type => ({ label: type.name, value: type.id }))}>
            </Select>
            <br />
            {formData.id_type === 1 ? (
                <>
                    <div className="flex-row">
                        <div className="flex-col">
                            <label htmlFor="option1" className="text-xl max-sm:text-lg font-semibold">Opción 1</label>
                        </div>
                        <label htmlFor="correct1">Correcta: </label>
                        <input type="checkbox" id="correct1" name="correct1"
                            className="p-1" onChange={handleInputChange} value={formData.correct1} />
                    </div>
                    <div className="flex-row">
                        <div className="flex-col">
                            <input type="text" id="option1" name="option1"
                                className="w-2/3 p-1 my-2 max-sm:w-full" onChange={handleInputChange} value={formData.option1} />
                            <br />
                        </div>
                    </div>

                    <div className="flex-row">
                        <div className="flex-col">
                            <label htmlFor="option2" className="text-xl max-sm:text-lg font-semibold">Opción 2</label>
                        </div>
                        <label htmlFor="correct2">Correcta: </label>
                        <input type="checkbox" id="correct2" name="correct2"
                            className="p-1" onChange={handleInputChange} value={formData.correct2} />
                    </div>
                    <div className="flex-row">
                        <div className="flex-col">
                            <input type="text" id="option2" name="option2"
                                className="w-2/3 p-1 my-2 max-sm:w-full" onChange={handleInputChange} value={formData.option2} /><br />

                        </div>
                    </div>

                    <div className="flex-row">
                        <div className="flex-col">
                            <label htmlFor="option3" className="text-xl max-sm:text-lg font-semibold">Opción 3</label>
                        </div>
                    </div>
                    <div className="flex-row">
                        <div className="flex-col">
                            <input type="text" id="option3" name="option3"
                                className="w-2/3 p-1 my-2 max-sm:w-full" onChange={handleInputChange} value={formData.option3} /><br />
                        </div>
                    </div>

                    <div className="flex-row">
                        <div className="flex-col">
                            <label htmlFor="option4" className="text-xl max-sm:text-lg font-semibold">Opción 4</label>
                        </div>
                    </div>
                    <div className="flex-row">
                        <div className="flex-col">
                            <input type="text" id="option4" name="option4"
                                className="w-2/3 p-1 my-2 max-sm:w-full" onChange={handleInputChange} value={formData.option4} /><br />
                        </div>
                    </div>

                </>
            ) : null}
            {formData.id_type === 2 ? (
                <>
                    <div className="flex-row">
                        <div className="flex-col">
                            <label htmlFor="verdadera" className="text-xl max-sm:text-lg font-semibold">Verdadera:</label>
                        </div>
                    </div>
                    <div className="flex-row">
                        <div className="flex-col">
                            <input type="text" id="verdadera" name="verdadera"
                                className="w-2/3 p-1 my-2 max-sm:w-full" /><br />
                        </div>
                    </div>
                    <div className="flex-row">
                        <div className="flex-col">
                            <label htmlFor="falsa" className="text-xl max-sm:text-lg font-semibold">Falsa:</label>
                        </div>
                    </div>
                    <div className="flex-row">
                        <div className="flex-col">
                            <input type="text" id="falsa" name="falsa"
                                className="w-2/3 p-1 my-2 max-sm:w-full" /><br />
                        </div>
                    </div>
                </>
            ) : null}
            <button onClick={handleSubmit}
                className="py-2 px-4 bg-white w-20 rounded-lg mt-5">
                Crear</button>
        </form>
    )
}