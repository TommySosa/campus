"use client"

import { useState } from "react"

export default function Home() {
    const [multiple, setMultiple] = useState(false)
    const [trueFalse, setTrueFalse] = useState(false)
    const [complete, setComplete] = useState(false)
    const [drag, setDrag] = useState(false)



    const handleChangeType = (e) => {
        console.log(e.target.value)
        if (e.target.value === "1") {
            setMultiple(true)
            setTrueFalse(false)
            setComplete(false)
            setDrag(false)
        }
        if (e.target.value === "2") {
            setTrueFalse(true)
            setMultiple(false)
            setComplete(false)
            setDrag(false)
        }
        if (e.target.value === "3") {
            setComplete(true)
            setMultiple(false)
            setTrueFalse(false)
            setDrag(false)
        }
        if (e.target.value === "4") {
            setDrag(true)
            setMultiple(false)
            setTrueFalse(false)
            setComplete(false)
        }
    }
    return (
        <main className="bg-elf-green-500 rounded-xl h-[85vh] max-sm:h-full max-sm:pb-2 text-zinc-600">
            <h1 className="text-lg text-center">Crear ejercicios</h1>
            {/* <br /> */}
            <section className="flex justify-center">
                <form className="flex flex-col w-2/3">
                    <label htmlFor="name">Nombre</label>
                    <input type="text" id="name" name="name"
                        className="w-2/3 p-1 max-sm:w-full" placeholder="Nouns + prepositions 1.1" />
                    <label htmlFor="instruction">Consigna</label>
                    <input type="text" id="instruction" name="instruction"
                        className="w-2/3 p-1 max-sm:w-full"
                        placeholder="Elija el sustantivo correcto según la frase." />
                    <label htmlFor="module">Módulo</label>
                    <select id="module" name="module"
                        className="w-2/3 p-1 max-sm:w-full">
                        <option value="1">Módulo 1</option>
                        <option value="2">Módulo 2</option>
                        <option value="3">Módulo 3</option>
                    </select>
                    <label htmlFor="type">Tipo</label>
                    <select id="type" name="type"
                        className="w-2/3 p-1 max-sm:w-full" onChange={handleChangeType}>
                        <option disabled selected>Selecciona un tipo</option>
                        <option value="1">Multiple choise</option>
                        <option value="2">Verdadero o falso</option>
                        <option value="3">Completa la frase</option>
                        <option value="4">Arrastra las palabras</option>
                    </select>
                    <br />
                    {multiple ? (
                        <>
                            <div className="flex-row">
                                <div className="flex-col">
                                    <label htmlFor="option1" className="text-xl max-sm:text-lg font-semibold">Opción 1</label>
                                </div>
                                <label htmlFor="correct1">Correcta: </label>
                                <input type="checkbox" id="correct1" name="correct1"
                                    className="p-1" />
                            </div>
                            <div className="flex-row">
                                <div className="flex-col">
                                    <input type="text" id="option1" name="option1"
                                        className="w-2/3 p-1 my-2 max-sm:w-full" /><br />

                                </div>
                            </div>

                            <div className="flex-row">
                                <div className="flex-col">
                                    <label htmlFor="option2" className="text-xl max-sm:text-lg font-semibold">Opción 2</label>
                                </div>
                                <label htmlFor="correct2">Correcta: </label>
                                <input type="checkbox" id="correct2" name="correct2"
                                    className="p-1" />
                            </div>
                            <div className="flex-row">
                                <div className="flex-col">
                                    <input type="text" id="option2" name="option2"
                                        className="w-2/3 p-1 my-2 max-sm:w-full" /><br />

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
                                        className="w-2/3 p-1 my-2 max-sm:w-full" /><br />

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
                                        className="w-2/3 p-1 my-2 max-sm:w-full" /><br />
                                </div>
                            </div>

                        </>
                    ) : null}
                    {trueFalse ? (
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
                    <button type="submit"
                        className="py-2 px-4 bg-white w-20 rounded-lg mt-5">
                        Crear</button>
                </form>
            </section>
        </main>
    )
}