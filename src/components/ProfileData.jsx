"use client"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Spinner from "./Spinner";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ProfileData() {
    const { data: session, status } = useSession();
    const [corrects, setCorrects] = useState(0);
    const [incorrects, setIncorrects] = useState(0);
    const [chartSeries, setChartSeries] = useState([corrects, incorrects]);

    const [chartOptions, setChartOptions] = useState({
        labels: ["Correctos", "Incorrectos"],
    });

    useEffect(() => {
        if(status === "loading"){
          return
        } 
        async function fetchData() {
            const responseCorrect = await fetch(`http://localhost:4001/api/correct/${session.user.id_user}`);
            const correctsdata = await responseCorrect.json()
            setCorrects(correctsdata.length)

            const responseIncorrect = await fetch(`http://localhost:4001/api/incorrect/${session.user.id_user}`);
            const incorrectsdata = await responseIncorrect.json()
            setIncorrects(incorrectsdata.length)
        }
        fetchData()
    }, [session, status])

    useEffect(() => {
        setChartSeries([corrects, incorrects]);
    }, [corrects, incorrects]);

    return (
        <>
            <div className="text-center border-b pb-12 mt-10 ">
                {
                    session ? (<>
                        <h1 className="text-4xl font-medium text-gray-700"><span className="font-light text-gray-500">Hi,</span> {session ? session.user.name : <Spinner />}</h1>
                        <p className="font-light text-gray-600 mt-3">{session ? session.user.email : <Spinner/>}</p>
                    </>) : null
                }

                <div className="grid grid-cols-3 text-center order-last md:order-first mt-10">
                    <div>
                        <p className="font-bold text-gray-700 text-xl">22</p>
                        <p className="text-gray-400 text-sm md:text-md">Courses</p>
                    </div>

                    <div>
                        <p className="font-bold text-gray-700 text-xl">10</p>
                        <p className="text-gray-400 text-sm md:text-md">Teachers</p>
                    </div>
                    <div>
                        <p className="font-bold text-gray-700 text-xl">89%</p>
                        <p className="text-gray-400 text-sm md:text-md">Progress</p>
                    </div>
                </div>
            </div>
            <p className="mt-8 text-center text-gray-500">Aqui podras observar tu progreso en tus cursos</p>
            <div className="mt-12 flex flex-col justify-center">
                <p className="text-gray-600 text-center font-light lg:px-16"></p>
                <div className="grid grid-cols-2 gap-5 text-center order-last md:order-first mt-10">
                    <div>
                        <p className="font-bold text-gray-700 text-xl">{corrects + incorrects}</p>
                        <p className="text-gray-400">Ejercicios</p>
                    </div>
                    <div>
                        <p className="font-bold text-gray-700 text-xl">{corrects}</p>
                        <p className="text-gray-400">Correctos</p>
                    </div>
                    <div>
                        <p className="font-bold text-gray-700 text-xl">{incorrects}</p>
                        <p className="text-gray-400">incorrectos</p>
                    </div>
                    <div>
                        <p className="font-bold text-gray-700 text-xl">89%</p>
                        <p className="text-gray-400">Progress</p>
                    </div>
                </div>
                <div className="flex justify-center w-full items-center">
                    <Chart options={chartOptions} series={chartSeries} type="donut" width="380" />
                </div>
                <button
                    className="text-indigo-500 py-2 px-4  font-medium mt-4"
                >
                    View Courses
                </button>
            </div>
        </>
    )
}