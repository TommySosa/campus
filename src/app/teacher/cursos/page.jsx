"use client";

import CRUDCursos from "@/components/teacher/CRUDCursos";
import ListarCursos from "@/components/teacher/ListarCursos";
import axios from "axios";
import { useEffect, useState } from "react";



export default function Page() {
  const baseURLCursos = "http://localhost:4000/api/courses";
  // const baseURLCategorias = "http://localhost:4000/api/categories";
  const baseURLProfesores = "http://localhost:4001/api/teachers";

  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [cursos, setCursos] = useState([]);
  // const [categorias, setCategorias] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [cursoActualizado, setCursoActualizado] = useState(null);

  useEffect(() => {
    cargarCursos();
    // cargarCategorias();
    cargarProfesores();
  }, []);

  const cargarCursos = async () => {
    try {
      const response = await axios.get(baseURLCursos);
      const result = await response.data.data;
      setCursos(result);
    } catch (error) {
      console.error("Error al obtener los cursos:", error);
    }
  };

  // const cargarCategorias = async () => {
  //   try {
  //     const response = await axios.get(baseURLCategorias);
  //     const result = await response.data.data;
  //     setCategorias(result);
  //   } catch (error) {
  //     console.error("Error al obtener las categorias:", error);
  //   }
  // };

  const cargarProfesores = async () => {
    try {
      const response = await axios.get(baseURLProfesores);
      const result = await response.data;
      setProfesores(result);
    } catch (error) {
      console.error("Error al obtener los profesores:", error);
    }
  };

  const actualizarCurso = (curso) => {
    setCursoActualizado(curso);
  };

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
          profesores={profesores}
        />
      </div>
    </>
  );
}
