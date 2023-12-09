"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ModuleButton({ module, isModuleCompleted, previousModuleId }) {
    const [isOpen, setIsOpen] = useState(false);
    const [modulesExercises, setModulesExercises] = useState([]);
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:4000/api/module_exercises/${module.id_module}`);
            const data = await response.json();
            setModulesExercises(data.data);
        }

        fetchData();
    }, [module.id_module]);

    const toggleCollapsible = async () => {
        if (!previousModuleId) {
            setIsOpen(!isOpen);
            setShowWarning(false);
        } else {
            const completed = await isModuleCompleted(previousModuleId);

            if (completed) {
                setIsOpen(!isOpen);
                setShowWarning(false);
            } else {
                setShowWarning(true);
            }
        }
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

                {showWarning && (
                    <div className="text-red-500 mb-2">
                        Advertencia: Primero realice los ejercicios del módulo anterior antes de continuar.
                    </div>
                )}

                {isOpen && !showWarning && (
                    <div className="p-1">
                        {modulesExercises.length > 0 ? (
                            modulesExercises.map((exercise) => (
                                <button
                                    className="bg-elf-green-400 w-full px-2 py-1 rounded mb-1"
                                    key={exercise.id_exercise}
                                >
                                    <Link
                                        href={`/courses/${module.id_course}/exercises/${exercise.id_exercise}`}
                                    >
                                        {exercise.name}
                                    </Link>
                                </button>
                            ))
                        ) : (
                            <div>No hay ejercicios</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

