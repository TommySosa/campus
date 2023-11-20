"use client"

import CRUDCursos from "@/components/teacher/CRUDCursos";
import ListarCursos from "@/components/teacher/ListarCursos";
import axios from "axios";
import { useEffect, useState } from 'react';

export default function Page() {

  const baseURL = "http://localhost:4000/api/courses"

  const [cursoSeleccionado, setCursoSeleccionado] = useState(null)
  const [cursos, setCursos] = useState([])
  const [cursoActualizado, setCursoActualizado] = useState(null)

  useEffect(() => {
    console.log("Se ejecuta el UseEffect")
    cargarCursos()
  }, [])

  const cargarCursos = async () => {
    try {
      const response = await axios.get(baseURL)
      const result = await response.data.data
      // console.log("response.data: " + JSON.stringify(response.data.data))
      setCursos(result)
    } catch (error) {
      console.error("Error al obtener los cursos:", error);
    }
  }

  const actualizarCurso = (curso) => {
    setCursoActualizado(curso)
  }

  return (
    <>
      <div className="lista">
        <ListarCursos
          cursoSeleccionado={cursoSeleccionado}
          setCursoSeleccionado={setCursoSeleccionado}
          cursos={cursos}
          actualizarCurso={actualizarCurso}
        />
      </div>
      <div className="CRUD">
        <CRUDCursos
          cursoSeleccionado={cursoSeleccionado}
          setCursoSeleccionado={setCursoSeleccionado}
          cargarCursos={cargarCursos}
          cursoActualizado={cursoActualizado}
        />
      </div>
    </>
  );
};
