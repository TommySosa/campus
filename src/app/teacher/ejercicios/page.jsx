"use client"

import axios from 'axios'
import ListarEjercicios from '@/components/teacher/ListarEjercicios'
import CRUDEjercicios from '@/components/teacher/CRUDEjercicios'
import { useEffect, useState } from 'react'

export default function Page () {

  const baseURL = "http://localhost:4000/api/exercises"

  const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState(null)
  const [ejercicios, setEjercicios] = useState([])
  const [ejercicioActualizado, setEjercicioActualizado] = useState(null)

  useEffect(() => {
    cargarEjercicios()
  }, [])

  const cargarEjercicios = async () => {
    try {
      const response = await axios.get(baseURL)
      const result = await response.data.data

      setEjercicios(result)
    } catch (error) {
      console.error("Error al obtener los ejercicios:", error);
    }
  }

  const actualizarEjercicio = (ejercicio) => {
    setEjercicioActualizado(ejercicio)
  }

  return (
    <>
      <div className='lista'>
        <ListarEjercicios
          ejercicioSeleccionado={ejercicioSeleccionado}
          setEjercicioSeleccionado={setEjercicioSeleccionado}
          ejercicios={ejercicios}
          actualizarEjercicio={actualizarEjercicio}
        />
      </div>
      <div className='CRUD'>
        <CRUDEjercicios
          ejercicioSeleccionado={ejercicioSeleccionado}
          setEjercicioSeleccionado = {setEjercicioSeleccionado}
          cargarEjercicios={cargarEjercicios}
        />
      </div>
    </>
  )
}