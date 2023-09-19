/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from "react";
import SidebarCourse from "@/components/SidebarCourse";

export default function TeacherLayout({ children, params }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="lg:flex h-[90vh]">
            {/* Sidebar (visible en pantallas grandes) */}
            <aside className={`text-white w-64 flex-shrink-0 ${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
                {/* Contenido del sidebar aquí */}
                <SidebarCourse id_params={params.courseId}/>
            </aside>

            {/* Contenido Principal */}
            <div className="flex-1 bg-gray-100 p-8">
                {/* Contenido principal aquí */}
                {
                    !sidebarOpen ? <>{children}</> : null
                }
                {/* {children} */}
            </div>

            {/* Botón desplegable del sidebar (visible en pantallas pequeñas) */}
            <button onClick={toggleSidebar} className="lg:hidden bg-elf-green-600 rounded-lg text-white w-12 h-12 fixed bottom-4 right-4 z-100">
                {/* Icono de botón desplegable*/}
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 14.5L12 9.5L17 14.5" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </div>
    )
}