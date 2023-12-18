"use client"
import ToCorrect from "@/components/ToCorrect.jsx";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Deliverables() {
    const [courses, setCourses] = useState([])
    const [selectedId, setSelectedId] = useState(0)
    useEffect(() => {
        async function fetchCourses() {
            try {
                const response = await axios.get('http://localhost:4001/api/courses')
                const data = await response.data
                console.log(data);
                setCourses(data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchCourses()
    }, [])

    const handleChangeSelected = (e) => {
        console.log(e.target.value);
        setSelectedId(e.target.value)
    }
    return (
        <main className="flex flex-col items-center justify-center ">
            <label htmlFor="courses" className="mb-4">
                Seleccione el curso
            </label>
            <select
                name="courses"
                id="courses"
                onChange={handleChangeSelected}
                className="mb-4 p-2 border"
            >
                <option value={0}>Seleccione un curso</option>
                {courses && courses.length > 0 ? (
                    courses.map((course) => (
                        <option key={course.id_course} value={course.id_course}>
                            {course.name}
                        </option>
                    ))
                ) : (
                    <option disabled>No hay cursos disponibles</option>
                )}
            </select>
            <div className="flex justify-center items-center">
                <ToCorrect id_course={selectedId} />
            </div>
        </main>
    )
}