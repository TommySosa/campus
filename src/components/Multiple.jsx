"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
export default function Multiple({ id, name, instruction }) {
    const [multiple, setMultiples] = useState([]);
    const [first, setFirst] = useState(false);
    const [second, setSecond] = useState(false);
    const [third, setThird] = useState(false);
    const [fourth, setFourth] = useState(false);
    const [opciones, setOpciones] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const { data: session, status } = useSession()
    const [realizado, setRealizado] = useState(false)

    useEffect(() => {
        async function check() {
            const response = await axios.post('http://localhost:4001/api/exercises/check', {
                id_user: await session.user.id_user,
                id_exercise: id
            })
            const result = await response.data[0].total
            console.log('CHECK', result);
            if (result == 0) {
                setRealizado(true);
                fetchData()
            } else {
                setRealizado(false)
            }
        }
        async function fetchData() {
            const response = await fetch(`/api/multiple/${id}`);
            const data = await response.json();
            setMultiples(data.data);

            if (data.data.options) {
                setOpciones(data.data.options);
                randomArray(data.data.options);
            }
        }
        console.log('OPTIONS',multiple.options);
        check()
        // fetchData();
    }, [realizado]);

    // funcion para ordenar aleatoriamente el array
    function randomArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const answers = [];
        if (first) {
            answers.push(opciones[0].text);
        }
        if (second) {
            answers.push(opciones[1].text);
        }
        if (third) {
            answers.push(opciones[2].text);
        }
        if (fourth) {
            answers.push(opciones[3].text);
        }
        const incorrectAnswers = opciones.filter((opcion) => answers.includes(opcion.text) && !opcion.correct);
        const correctAnswers = opciones.filter((opcion) => answers.includes(opcion.text) && opcion.correct);

        //Esto es temporal
        if (incorrectAnswers.length > 0) {
            setFeedbackMessage("Respuesta incorrecta");
            try {
                axios.post('http://localhost:4001/api/exercises/incorrect', {
                    id_exercise: id,
                    id_user: session.user.id_user
                })
            } catch (error) {
                console.log(error);
            }
            setRealizado(false)
        } else if (correctAnswers.length === opciones.filter((opcion) => opcion.correct).length) {
            setFeedbackMessage("Respuesta correcta");
            try {
                axios.post('http://localhost:4001/api/exercises/correct', {
                    id_exercise: id,
                    id_user: session.user.id_user
                })
            } catch (error) {
                console.log(error);
            }
            setRealizado(false)
        } else {
            setFeedbackMessage("Aún no has seleccionado todas las respuestas correctas.");
        }
    }

    return (
        <div className="flex justify-center items-center w-full h-full">
            <div>
                <div className="text-xl ">
                    <h1>{name}</h1>
                    <br />
                    <p className="underline">{instruction}</p>
                    <br />
                </div>
                {
                    realizado ? (<><div className="flex">
                        <div className="flex-col">
                            <div className="flex-row min-w-[250px]">
                                {
                                    multiple.options ? (
                                        multiple.options.map((opcion, index) => <p key={index}>{opcion.text}</p>)) : <div>Error al traer el ejercicio</div>
                                }
                            </div>
                        </div>
                        <div className="flex-col">
                            <div className="flex-row">
                                <input type="checkbox" onChange={() => setFirst(!first)} />
                            </div>
                            <div className="flex-row">
                                <input type="checkbox" onChange={() => setSecond(!second)} />
                            </div>
                            <div className="flex-row">
                                <input type="checkbox" onChange={() => setThird(!third)} />
                            </div>
                            <div className="flex-row">
                                <input type="checkbox" onChange={() => setFourth(!fourth)} />
                            </div>
                        </div>
                    </div>
                        <div className="mt-10 flex justify-center">
                            <button className="px-4 py-2 bg-elf-green-500 rounded-lg" onClick={handleSubmit}>Enviar</button>
                        </div>
                        <div className="mt-4 text-center">{feedbackMessage}</div></>) : (<><h1>{feedbackMessage}</h1><p>Ya realizado</p></>)
                }
            </div>
        </div>
    )
}