"use client"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import axios from "axios";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProfileData() {
    const { data: session, status } = useSession();
    const [corrects, setCorrects] = useState(0);
    const [incorrects, setIncorrects] = useState(0);
    const [idUser, setIdUser] = useState(0)
    const [inscriptions, setInscriptions] = useState(null)
    const [correctsByCourse, setCorrectsByCourse] = useState([])
    const [asd, setAsd] = useState()

    useEffect(() => {
        setIdUser(session.user.id_user)
    }, [session.user.id_user])

    useEffect(() => {
        async function fetchData() {
            const responseCorrect = await axios.get(`http://localhost:4001/api/correct/${session.user.id_user}`)
            const data = await responseCorrect.data
            console.log(data);
            setCorrects(data.length)
            console.log('data', data.length);

            const responseIncorrect = await axios.get(`http://localhost:4001/api/incorrect/${session.user.id_user}`)
            const dataInc = await responseIncorrect.data
            console.log('INC', dataInc.length);
            setIncorrects(dataInc.length)

            const progressResponse = await axios.get(`http://localhost:4001/api/progress/${session.user.id_user}`)
            const dataProgress = await progressResponse.data
            console.log('progress', dataProgress);
            setInscriptions(dataProgress)

        }
        fetchData()
    }, [session.user.id_user])

    useEffect(() => {
        console.log('CORRECTS BY COURSE', correctsByCourse);
        console.log(inscriptions);
    })

    const data = {
        labels: ['Correctos', 'Incorrectos'],
        datasets: [
            {
                data: [corrects, incorrects],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384'],
            },
        ],
    };

    return (
        <>
            <div className="text-center border-b pb-12 mt-2 ">
                {
                    session ? (<>
                        <h1 className="font-medium text-gray-700"><span className="font-light text-gray-500">Hola,</span> {session ? session.user.name : <Spinner />}</h1>
                        <p className="font-light text-gray-600 mt-3">{session ? session.user.email : <Spinner />}</p>
                    </>) : null
                }
            </div>
            <div>
                <h2 className="mt-8 text-center text-gray-500">Aqui podras observar tu progreso en tus cursos</h2>
                {
                    corrects.length > 0 && incorrects.length > 0 ? <>
                        <h2 className="mt-8 text-center text-gray-500">Total de ejercicios realizados</h2>
                        <div className="flex justify-center">

                            <div className="flex justify-center w-40">
                                <Pie data={data} />
                            </div>
                        </div>
                    </> : null
                }

            </div>
            {
                inscriptions && inscriptions.length > 0 ? inscriptions.map((course) => (                    
                    <div key={course.id_course}>
                        <p className=" mt-8 text-center text-gray-500">Progreso del curso {course.course_name}: {course.total_exercises != 0 ? (((course.correct_count + course.incorrect_count ) / course.total_exercises) * 100).toFixed(2): 0}% realizado</p>
                        <h4 className="text-center text-gray-500">Total de ejercicios realizados: {course.correct_count + course.incorrect_count}</h4>
                        <div className="flex justify-center">

                            <div className="flex justify-center w-40">
                                {
                                    course.correct_count + course.incorrect_count > 0 ?
                                    <Pie data={{
                                        labels: ['Correctos', 'Incorrectos'],
                                        datasets: [
                                            {
                                                data: [course.correct_count, course.incorrect_count],
                                                backgroundColor: ['#36A2EB', '#FF6384'],
                                                hoverBackgroundColor: ['#36A2EB', '#FF6384'],
                                            },
                                        ],
                                    }} /> : null
                                }
                            </div>
                        </div>
                    </div>
                )) : <p className="text-center">No estás inscripto en ningún curso!</p>
            }

        </>
    )
}
