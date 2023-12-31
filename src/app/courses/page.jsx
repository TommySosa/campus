"use client"
import CourseCard from "@/components/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
export default  function Home() {
    const { data: session, status } = useSession();
    const [courses, setCourses] = useState([])

    useEffect(()=> {
        async function fetchData(){
            const response = await axios.get(`http://localhost:4001/api/user-courses/${session.user.id_user}`)
            const data = await response.data
            setCourses(data)
        }
        fetchData()
    },[session.user.id_user])

    return (
        <section className="flex justify-center mt-12 flex-wrap">
            {
                courses.length > 0 ?
                courses.map((course) => (
                    <CourseCard key={course.id_course} course={course}/>
                )) : <p>No estás inscripto a ningún curso!</p>
            }
        </section>
    )
}