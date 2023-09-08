"use client"
import { useState } from 'react';
import useSWR from 'swr';
import Spinner from './Spinner';

const CollapsableButton = () => {
    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data, error, isLoading } = useSWR('/api/modules', fetcher);

    if (error) return <div>failed to load</div>
    if (isLoading) return <Spinner />

    return (
        <div>
            {data.data.map((module) => (
                <ModuleButton key={module.id_module} module={module} />
            ))}
        </div>
    );

};

const ModuleButton = ({ module }) => {
    const [isOpen, setIsOpen] = useState(false);

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
                        <span className="text-xs text-gray-600">Curso 1</span>
                    </div>
                </button>

                {isOpen && (
                    <div className="bg-gray-200 p-3">
                        {/* Aquí puedes colocar tus opciones o contenido */}
                        <button className="bg-elf-green-400 w-full px-2 py-1 rounded mb-1">
                            Ejercicio 1
                        </button>
                        <button className="bg-elf-green-400 w-full px-2 py-1 rounded mb-1">
                            Ejercicio 2
                        </button>
                        <button className="bg-elf-green-400 w-full px-2 py-1 rounded mb-1">
                            Ejercicio 3
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CollapsableButton;
