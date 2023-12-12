"use client"
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ReadModal({ isOpen, onClose, id_student_course }) {
    const [grades, setGrades] = useState([]);

    useEffect(() => {
        async function fetchGrades() {
            try {
                const response = await axios.get(
                    `http://localhost:4001/api/inscription-grades/${id_student_course}`
                );
                const data = await response.data;
                console.log(data);

                // Agrupar las notas por curso y calcular el promedio
                const groupedGrades = data.reduce((acc, grade) => {
                    const existingCourseIndex = acc.findIndex(
                        (item) => item.course_name === grade.course_name
                    );

                    if (existingCourseIndex !== -1) {
                        acc[existingCourseIndex].exams.push({
                            grade: grade.grade_value,
                            exam_name: grade.exam_name,
                        });
                    } else {
                        acc.push({
                            course_name: grade.course_name,
                            exams: [{ grade: grade.grade_value, exam_name: grade.exam_name }],
                        });
                    }

                    return acc;
                }, []);

                // Calcular el promedio y actualizar la estructura de datos
                const gradesWithAverage = groupedGrades.map((group) => {
                    const exams = group.exams.map((exam) => exam.grade);
                    const sum = exams.reduce((total, grade) => total + grade, 0);
                    const average = exams.length > 0 ? sum / exams.length : 0;

                    return {
                        course_name: group.course_name,
                        exams: group.exams,
                        average: isNaN(average) ? 0 : average.toFixed(2),
                    };
                });

                setGrades(gradesWithAverage);
            } catch (error) {
                console.log(error);
            }
        }

        fetchGrades();
    }, [id_student_course]);

    return (
        <div
            className={`${isOpen ? "" : "hidden"} overflow-y-auto overflow-x-hidden fixed inset-0 flex  z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
            role="dialog"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 border-gray-600">
                        <h3
                            className="text-lg font-semibold text-gray-900 "
                            id="modal-title"
                        >
                            Notas
                        </h3>
                        <button
                            onClick={onClose}
                            type="button"
                            className="text-gray-400 bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
                        >
                            <svg
                                aria-hidden="true"
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <button className="sr-only">Cerrar modal</button>
                        </button>
                    </div>
                    <form aria-labelledby="modal-title">
                        <div>
                            <h4 className="text-lg font-semibold mb-2">Tabla de Notas</h4>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Curso
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Notas
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Tipo de Examen
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Promedio
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {grades.map((grade, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {grade.course_name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {grade.exams.map((exam, i) => (
                                                    <div key={i}>
                                                        {exam.grade}
                                                    </div>
                                                ))}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {grade.exams.map((exam, i) => (
                                                    <div key={i}>
                                                        <strong>{exam.exam_name}</strong>
                                                    </div>
                                                ))}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {grade.average}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
