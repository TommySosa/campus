"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ListarEjercicios from '@/components/teacher/ListarEjercicios'
import CRUDEjercicios from '@/components/teacher/CRUDEjercicios'



const page = () => {

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

export default page