/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function TeacherLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
    return (
        <div className="lg:flex h-screen">
            {/* Sidebar (visible en pantallas grandes) */}
            <aside className={`bg-gray-800 text-white w-64 flex-shrink-0 ${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
                {/* Contenido del sidebar aquí */}
                <Sidebar />
            </aside>

            {/* Contenido Principal */}
            <div className="flex-1 bg-gray-100 p-8">
                {/* Contenido principal aquí */}
                {children}
            </div>

            {/* Botón desplegable del sidebar (visible en pantallas pequeñas) */}
            <button onClick={toggleSidebar} className="lg:hidden bg-gray-800 text-white w-12 h-12 fixed bottom-4 right-4 z-10">
                {/* Icono de botón desplegable (por ejemplo, un ícono de hamburguesa) */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                >
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
            </button>
        </div>
    )
}