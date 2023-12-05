"use client"

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function ModuleButton({ module }) {
    const [isOpen, setIsOpen] = useState(false);
    const [modules_exercises, setModules_exercises] = useState([]);
    const prevModuleId = useRef(null)

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:4000/api/module_exercises/${module.id_module}`);
            const data = await response.json();
            setModules_exercises(data.data);
        }

        // if (module.id_module !== prevModuleId.current) {
        //     fetchData();
        //     prevModuleId.current = module.id_module;
        // }
        fetchData()
    }, [module.id_module]);

    const toggleCollapsible = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div>
            <div key={module.id_module}>
                <button
                    className="bg-elf-green-600 text-white px-4 py-2 rounded w-full mb-2 transition-all"
                    onClick={toggleCollapsible}
                >
                    <div className="leading-4">
                        <h4 className="font-semibold">{module.name}</h4>
                        <span className="text-xs text-gray-600">Curso {module.course_name}</span>
                    </div>
                </button>

                {isOpen && (
                    <div className=" p-1">
                        {
                            modules_exercises.length > 0 ? (
                                modules_exercises.map(exercise =>
                                    <button className="bg-elf-green-400 w-full px-2 py-1 rounded mb-1" key={exercise.id_exercise}>
                                        <Link href={`/courses/${module.id_course}/exercises/${exercise.id_exercise}`}>
                                            {exercise.name}
                                        </Link>
                                    </button>
                                )) : <div>No hay ejercicios</div>
                        }
                    </div>
                )}
            </div>
        </div>
    );
}