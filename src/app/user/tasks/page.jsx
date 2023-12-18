"use client"
import AssignedTasks from "@/components/AssignedTasks"
import axios from "axios"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
export default function Tasks() {
    const { data: session, status } = useSession()
    const [tasks, setTasks] = useState([])
    useEffect(() => {
        async function fetchTasks() {
            try {
                const response = await axios.get(`http://localhost:4001/api/assigned/${session.user.id_user}`)
                const data = await response.data
                console.log(data);
                setTasks(data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchTasks()
    }, [session.user.id_user])
    return (
        <main className="container mx-auto mt-8">
            <section>
                <h1>Tareas asignadas: </h1>
                <div >
                    {
                        tasks && tasks.length > 0 ? tasks.map((task)=> (
                            <AssignedTasks task={task} key={task.id_assigned}/>
                        )): <p>No tenes tareas asignadas</p>
                    } 
                </div>
            </section>
        </main>
    )
}