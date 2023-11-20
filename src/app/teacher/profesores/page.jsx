"use client"
import { useEffect, useState } from 'react'
import axios from 'axios'
import ListarProfesores from '@/components/teacher/ListarProfesores'
import CRUDProfesores from '@/components/teacher/CRUDProfesores'

export default function Page() {
  const baseURL = "http://localhost:4000/api/teachers"

  const [profesorSeleccionado, setProfesorSeleccionado] = useState(null)
  const [profesores, setProfesores] = useState([])
  const [profesorActualizado, setProfesorActualizado] = useState(null)

  useEffect(() => {
    cargarProfesores()
  }, [])

  const cargarProfesores = async () => {
    try {
      const response = await axios.get(baseURL)
      setProfesores(response.data)
    } catch (error) {
      console.error("Error al obtener los profesores")
    }
  }

  const actualizarProfesor = (profesor) => {
    setProfesorActualizado(profesor)
  }

  return (
    <>
      <div className="lista">
        <ListarProfesores
          profesorSeleccionado={profesorSeleccionado}
          setProfesorSeleccionado={setProfesorSeleccionado}
          profesores={profesores}
          actualizarProfesor={actualizarProfesor} // Pasa la función de actualización
        />
      </div>
      <div className="CRUD">
        <CRUDProfesores
          profesorSeleccionado={profesorSeleccionado}
          setProfesorSeleccionado={setProfesorSeleccionado}
          cargarProfesores={cargarProfesores}
          profesorActualizado={profesorActualizado} // Pasa el libro seleccionado para edición
        />
      </div>
    </>
  )
}