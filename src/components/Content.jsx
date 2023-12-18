"use client"
import React, { useState } from 'react';

const CourseContentPreview = ({ title, description, pdfUrl }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div className="bg-white p-4 shadow-md rounded-md mb-4">
            <h3 className="font-bold mb-2">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <div className="flex justify-center">
                <iframe
                    src={pdfUrl}
                    alt="PDF Preview"
                    className="w-3/4 h-3/4 object-cover"
                />
            </div>
            <button onClick={openModal} className="w-full h-full rounded-md overflow-hidden focus:outline-none">
                Ver
            </button>
            {modalIsOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75">
                    <div className="w-3/4 h-3/4 overflow-hidden bg-white p-4 rounded-md">
                        <button onClick={closeModal} className="absolute top-4 right-4 text-white focus:outline-none">
                            Cerrar
                        </button>
                        <iframe
                            className="w-full h-full"
                            src={pdfUrl}
                            title="PDF Preview"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseContentPreview;
