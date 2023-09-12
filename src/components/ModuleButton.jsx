import Spinner from './Spinner';
import useSWR from 'swr';
import { useState } from 'react';

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function  ModuleButton ({ module }){
    const [isOpen, setIsOpen] = useState(false);
    const { data, error, isLoading } = useSWR(`/api/module_exercises/${module.id_module}`, fetcher);
    if (error) return <div>failed to load</div>
    if (isLoading) return <Spinner />


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
                    <div className="bg-gray-200 p-3">
                        {
                            data.data.length > 0 ? (
                            data.data.map(exercise => 
                                <button className="bg-elf-green-400 w-full px-2 py-1 rounded mb-1" key={exercise.id_exercise}>
                                    {exercise.name}
                                </button>
                            )) : <div>No hay ejercicios</div>
                        }
                    </div>
                )}
            </div>
        </div>
    );
}