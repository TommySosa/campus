"use client";

import axios from "axios";
import ListarEjercicios from "@/components/teacher/ListarEjercicios";
import CRUDEjercicios from "@/components/teacher/CRUDEjercicios";
import { useEffect, useState } from "react";



export default function Page() {
  const baseURL = "http://localhost:4000/api/exercises";
  const baseURLModulos = "http://localhost:4000/api/modules"
  const baseURLTipos = "http://localhost:4001/api/exercise_types"


  const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState(null);
  const [ejercicios, setEjercicios] = useState([]);
  const [modulos, setModulos] = useState([])
  const [tipos, setTipos] = useState([])
  const [ejercicioActualizado, setEjercicioActualizado] = useState(null);

  useEffect(() => {
    cargarEjercicios();
    cargarModulos()
    cargarTipos()
  }, []);

  const cargarEjercicios = async () => {
    try {
      const response = await axios.get(baseURL);
      const result = await response.data.data;

      setEjercicios(result);
    } catch (error) {
      console.error("Error al obtener los ejercicios:", error);
    }
  };

  const cargarModulos = async () => {
    try {
      const response = await axios.get(baseURLModulos);
      const result = await response.data.data;

      setModulos(result);
    } catch (error) {
      console.error("Error al obtener los modulos:", error);
    }
  };

  const cargarTipos = async () => {
    try {
      const response = await axios.get(baseURLTipos);
      const result = await response.data;

      setTipos(result);
    } catch (error) {
      console.error("Error al obtener los tipos:", error);
    }
  };

  const actualizarEjercicio = (ejercicio) => {
    setEjercicioActualizado(ejercicio);
  };

  return (
    <>
      <div className="lista">
        <ListarEjercicios
          ejercicioSeleccionado={ejercicioSeleccionado}
          setEjercicioSeleccionado={setEjercicioSeleccionado}
          ejercicios={ejercicios}
          actualizarEjercicio={actualizarEjercicio}
        />
      </div>
      <div className="CRUD">
        <CRUDEjercicios
          ejercicioSeleccionado={ejercicioSeleccionado}
          setEjercicioSeleccionado={setEjercicioSeleccionado}
          ejercicioActualizado={ejercicioActualizado}
          cargarEjercicios={cargarEjercicios}
          modulos={modulos}
          tipos={tipos}
        />
      </div>
    </>
  );
}
