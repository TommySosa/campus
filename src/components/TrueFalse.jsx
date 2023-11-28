"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function TrueFalse({ trueFalseId, name, instruction }) {
    const [realizado, setRealizado] = useState(false);
    const [exercises, setExercises] = useState(null);
    const { data: session, status } = useSession();
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [selectedOptions, setSelectedOptions] = useState({
        true_option: { answer: "", correct: false },
        false_option: { answer: "", correct: false },
    });

    useEffect(() => {
        async function check() {
            const response = await axios.post(
                "http://localhost:4001/api/exercises/check",
                {
                    id_user: await session.user.id_user,
                    id_exercise: trueFalseId,
                }
            );
            const result = await response.data[0].total;
            console.log("CHECK", result);
            if (result == 0) {
                setRealizado(true);
                fetchData();
            } else {
                setRealizado(false);
            }
        }

        async function fetchData() {
            const response = await fetch(`/api/trueFalse/${trueFalseId}`);
            const data = await response.json();
            setExercises(data.data);
        }

        check();
    }, [realizado]);


    const handleCheckboxChange = (option) => {
        setSelectedOptions((prevOptions) => ({
            ...prevOptions,
            [option]: {
                ...prevOptions[option],
                correct: !prevOptions[option].correct,
            },
        }));
    };

    const handleSubmit = (e) => {
        console.log("Selected Options: ", selectedOptions);
        console.log('Exercises', exercises);
    
        const isOption1Correct =
            selectedOptions.true_option.answer === exercises.true_option &&
            selectedOptions.true_option.correct;
    
        const isOption2Correct =
            selectedOptions.false_option.answer === exercises.false_option &&
            selectedOptions.false_option.correct;
    
        // Comprobar si todas las opciones son correctas
        if (isOption1Correct && isOption2Correct) {
            console.log("¡Ejercicio realizado correctamente!");
            setFeedbackMessage("¡Ejercicio realizado correctamente!");
        } else {
            console.log("Respuestas incorrectas. Intenta de nuevo.");
            setFeedbackMessage("Respuestas incorrectas. Intenta de nuevo.");
        }
    };

    return (
        <div className="flex justify-center min-w-full">
            <div className="flex-col">
                <div className="text-xl ">
                    <h1>{name}</h1>
                    <br />
                    <p className="underline">{instruction}</p>
                    <br />
                </div>
                <div>
                    <div className="">
                        {exercises ? (
                            <>
                                <div className="flex">
                                    <div className="flex-col">
                                        <div className="flex-row">
                                            <p>Opción 1: </p>
                                            {exercises.true_option}
                                        </div>

                                        <div className="flex-row">
                                            <p>Opción 2: </p>
                                            {exercises.false_option}
                                        </div>
                                    </div>
                                    <div className="flex-col">
                                        <div className="flex-row">
                                            <input
                                                type="checkbox"
                                                checked={selectedOptions.option1}
                                                onChange={() =>
                                                    handleCheckboxChange("option1")
                                                }
                                            />
                                        </div>
                                        <br />
                                        <div className="flex-row">
                                            <input
                                                type="checkbox"
                                                checked={selectedOptions.option2}
                                                onChange={() =>
                                                    handleCheckboxChange("option2")
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-10 flex justify-center">
                                    <button
                                        className="px-4 py-2 bg-elf-green-500 rounded-lg"
                                        onClick={handleSubmit}
                                    >
                                        Enviar
                                    </button>
                                </div>
                                <div className="mt-4 text-center">
                                    {feedbackMessage}
                                </div>
                            </>
                        ) : (
                            <>
                                <h1>{feedbackMessage}</h1>
                                <p>Ya realizado</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}