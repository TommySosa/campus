"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function TrueFalse({ trueFalseId, name, instruction }) {
    const [realizado, setRealizado] = useState(false);
    const [exercises, setExercises] = useState(null);
    const { data: session } = useSession();
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        async function check() {
            const response = await axios.post(
                "http://localhost:4001/api/exercises/check",
                {
                    id_user: session.user.id_user,
                    id_exercise: trueFalseId,
                }
            );
            const result = await response.data[0].total;
            console.log("CHECK", result);
            if (result == 0) {
                setRealizado(false);
                // fetchData();
            } else {
                setRealizado(true);
            }
        }
        check();
    }, [realizado]);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(
                `http://localhost:4001/api/true_false/${trueFalseId}`
            );
            const data = await response.data;
            setExercises(data);
        }

        fetchData();
    }, [trueFalseId, session.user.id_user]);

    const handleCheckboxChange = (option) => {
        setSelectedOption(option);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedOption) {
            setFeedbackMessage("Por favor, selecciona una opción.");
            return;
        }

        const isCorrect = selectedOption === "true_option";

        try {
            // Si la respuesta es correcta, realiza la acción correspondiente
            if (isCorrect) {
                setFeedbackMessage("Respuesta correcta");

                // Envía una solicitud POST a la ruta de respuesta correcta
                await axios.post("http://localhost:4001/api/exercises/correct", {
                    id_exercise: trueFalseId,
                    id_user: session.user.id_user,
                });
            } else {
                setFeedbackMessage("Respuesta incorrecta");

                // Envía una solicitud POST a la ruta de respuesta incorrecta
                await axios.post("http://localhost:4001/api/exercises/incorrect", {
                    id_exercise: trueFalseId,
                    id_user: session.user.id_user,
                });
            }

            setRealizado(true);
        } catch (error) {
            console.error("Error al enviar la respuesta:", error);
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
                        {exercises && !realizado ? (
                            // Renderizar el contenido solo si exercises no es null
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
                                                type="radio"
                                                checked={selectedOption === "true_option"}
                                                onChange={() => handleCheckboxChange("true_option")}
                                            />
                                        </div>
                                        <br />
                                        <div className="flex-row">
                                            <input
                                                type="radio"
                                                checked={selectedOption === "false_option"}
                                                onChange={() => handleCheckboxChange("false_option")}
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
                                <div className="mt-4 text-center">{feedbackMessage}</div>
                            </>
                        ) : (
                            // Si exercises es null o realizado es true, mostrar otro contenido
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
