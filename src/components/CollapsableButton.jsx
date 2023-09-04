"use client"
import { useState } from 'react';

const CollapsableButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCollapsible = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button
                className="bg-elf-green-600 text-white px-4 py-2 rounded w-full mb-2 transition-all"
                onClick={toggleCollapsible}
            >
                <div className="leading-4">
                    <h4 className="font-semibold">Módulo 1</h4>
                    <span className="text-xs text-gray-600">Curso 1</span>
                </div>
            </button>
            {isOpen && (
                <div className="bg-gray-200 p-3">
                    {/* Aquí puedes colocar tus opciones o contenido */}
                    <button className='bg-elf-green-400 w-full px-2 py-1 rounded mb-1'>
                        Ejercicio 1
                    </button>
                    <button className='bg-elf-green-400 w-full px-2 py-1 rounded mb-1'>
                        Ejercicio 2
                    </button>
                    <button className='bg-elf-green-400 w-full px-2 py-1 rounded mb-1'>
                        Ejercicio 3
                    </button>
                </div>
            )}
        </div>
    );
};

export default CollapsableButton;
