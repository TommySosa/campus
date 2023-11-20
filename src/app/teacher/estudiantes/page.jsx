"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ListarEstudiantes from '@/components/teacher/ListarEstudiantes'
import CRUDEstudiantes from '@/components/teacher/CRUDEstudiantes'

const page = () => {

  const baseURL = "http://localhost:4000/api/students"

  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(null)
  const [estudiantes, setEstudiantes] = useState([])
  const [estudianteActualizado, setEstudianteActualizado] = useState(null)

  useEffect(() => {
    cargarEstudiantes()
  }, [])

  const cargarEstudiantes = async () => {
    try {
      const response = await axios.get(baseURL)
    } catch (error) {
      console.error("Error al obtener los estudiantes:", error);
    }
  }

  const actualizarEstudiante = (estudiante) => {
    setEstudianteActualizado(estudiante)
  }

  return (
    <>
      <div className="lista">
        <ListarEstudiantes
          estudianteSeleccionado={estudianteSeleccionado}
          setEstudianteSeleccionado={setEstudianteSeleccionado}
          estudiantes={estudiantes}
          actualizarEstudiante={actualizarEstudiante} // Pasa la función de actualización
        />
      </div>
      <div className="CRUD">
        <CRUDEstudiantes
          estudianteSeleccionado={estudianteSeleccionado}
          setEstudianteSeleccionado={setEstudianteSeleccionado}
          cargarEstudiantes={cargarEstudiantes}
          estudianteActualizado={estudianteActualizado} // Pasa el libro seleccionado para edición
        />
      </div>
    </>
  )
}

export default page