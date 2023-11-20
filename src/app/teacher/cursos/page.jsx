"use client"
import CRUDCursos from "@/components/teacher/CRUDCursos";
import ListarCursos from "@/components/teacher/ListarCursos";
import axios from "axios";
import React, { useEffect, useState } from "react";



const page = () => {

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
      const result = await response.json()
      console.log("response.data: "+result)
      setCursos(result.data)
    } catch (error) {
      console.error("Error al obtener los cursos:", error);
    }
  }

  const actualizarCurso = (curso) => {
    setCursoActualizado(curso)
  }

  console.log("cursos: "+cursos)

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

export default page;
