"use client"
import { useSession, signOut } from "next-auth/react";

export default function ProfileData() {
    const { data: session, status } = useSession();
    return (
        <>
            <div className="text-center border-b pb-12 mt-10 ">
                {
                    session ? (<>
                        <h1 className="text-4xl font-medium text-gray-700"><span className="font-light text-gray-500">Hi,</span> {session.user.name}</h1>
                        <p className="font-light text-gray-600 mt-3">{session.user.email}</p>
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
                {/* <p className="mt-2 text-gray-500">University of Computer Science {session.user.id_rol}</p> */}
            </div>
            <p className="mt-8 text-center text-gray-500">Aqui podras observar tu progreso en tus cursos</p>
            <div className="mt-12 flex flex-col justify-center">
                <p className="text-gray-600 text-center font-light lg:px-16"></p>
                <div className="grid grid-cols-2 gap-5 text-center order-last md:order-first mt-10">
                        <div>
                            <p className="font-bold text-gray-700 text-xl">22</p>
                            <p className="text-gray-400">modulos</p>
                        </div>
                        <div>
                            <p className="font-bold text-gray-700 text-xl">200</p>
                            <p className="text-gray-400">Ejercicios</p>
                        </div>
                        <div>
                            <p className="font-bold text-gray-700 text-xl">90</p>
                            <p className="text-gray-400">Correctos</p>
                        </div>
                        <div>
                            <p className="font-bold text-gray-700 text-xl">110</p>
                            <p className="text-gray-400">incorrectos</p>
                        </div>
                        <div>
                            <p className="font-bold text-gray-700 text-xl">89%</p>
                            <p className="text-gray-400">Progress</p>
                        </div>
                        <div className="h-4 w-full bg-gray-200 rounded overflow-hidden">
                           
                        <div>
                            <span id="ProgressLabel" class="sr-only">Loading</span>

                            <span
                                role="progressbar"
                                aria-labelledby="ProgressLabel"
                                aria-valuenow="75"
                                class="block rounded-full bg-gray-200 dark:bg-gray-700"
                            >
                            <span
                                class="block h-3 rounded-full bg-[repeating-linear-gradient(45deg,_var(--tw-gradient-from)_0,_var(--tw-gradient-from)_20px,_var(--tw-gradient-to)_20px,_var(--tw-gradient-to)_40px)] from-indigo-400 to-indigo-500"
                                style={{ width: `%` }}
                                ></span>
    
                            </span>
                        </div>   
                        {/* <div
                            className="h-full bg-blue-500 top-2"
                            style={{ width: `%` }}
                        ></div> */}
                        </div>
                        <div>
                            <p className="font-bold text-gray-700 text-xl">89%</p>
                            <p className="text-gray-400">Progress</p>
                        </div>
                        <div>
                            <span id="ProgressLabel" class="sr-only">Loading</span>

                            <span
                                role="progressbar"
                                aria-labelledby="ProgressLabel"
                                aria-valuenow="75"
                                class="block rounded-full bg-gray-200 dark:bg-gray-700"
                            >
                            <span
                                class="block h-3 rounded-full bg-[repeating-linear-gradient(45deg,_var(--tw-gradient-from)_0,_var(--tw-gradient-from)_20px,_var(--tw-gradient-to)_20px,_var(--tw-gradient-to)_40px)] from-indigo-400 to-indigo-500"
                                style={{ width: `%` }}
                                ></span>
    
                            </span>
                        </div> 
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