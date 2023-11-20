"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography, Grid, Paper } from "@mui/material";

export default function CRUDEstudiantes(estudianteSeleccionado, setEstudianteSeleccionado, cargarEstudiantes, estudianteActualizado){

  const baseURL = "http://localhost:4001/api/students"

  const [nuevoEstudiante, setNuevoEstudiante] = useState({
    id_student_course:"",
    id_student:"",
    id_course:"",
  })

  useEffect(() => {
    if(estudianteSeleccionado){
      setNuevoEstudiante({
        id_student_course: estudianteActualizado.id_student_course,
        id_student: estudianteActualizado.id_student,
        id_course: estudianteActualizado.id_course,
      })
    } else {
      setNuevoEstudiante({
        id_student_course:"",
    id_student:"",
    id_course:"",
      })
    }
  },[estudianteActualizado])

  const agregarEstudiante = async () => {
    try {
      if(nuevoEstudiante.id_student_course && nuevoEstudiante.id_student && nuevoEstudiante.id_course){
        const response = await axios.post(baseURL,nuevoEstudiante)

        if(response.status === 200){
          limpiarCampos()
          cargarEstudiantes()
          alert("Estudiante agregado correctamente")
        }
      } else {
        alert("Por favor, complete todos los campos")
      }
    } catch (error) {
      console.error("Error al agregar el estudiante:", error);
      
    }
  }

  const eliminarEstudiante = async () => {
    if(estudianteSeleccionado){
      try {
        const response = await axios.delete(`${baseURL}${estudianteSeleccionado}`)

        if(response.status === 204) {
          setEstudianteSeleccionado(null)
          limpiarCampos()
          cargarEstudiantes()
          alert("Estudiante eliminado correctamente")
        }
      } catch (error) {
        console.error("Error al eliminar el estudiante:", error);
        
      }
    }
  }

  const actualizarEstudiante = async () => {
    if(estudianteSeleccionado) {
      try {
        await axios.put(`${baseURL}${estudianteSeleccionado}`,nuevoEstudiante)
        await cargarEstudiantes()
        limpiarCampos()
        setEstudianteSeleccionado(null)
        alert("Estudiante eliminado correctamente")
      } catch (error) {
        console.error("Error al actualizar el libro:", error);
        
      }
    }


  }

  const limpiarCampos = () => {
    setNuevoEstudiante({
      id_student_course:"",
    id_student:"",
    id_course:"",
    })
  }

  return (
    <Paper elevation={3} sx={{ p: 2, bgcolor: "background.paper" }}>
      <Typography
        className="titulo-crud"
        variant="h6"
        component="div"
        sx={{ color: "text.primary" }}
      >
        Agregar Estudiante
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Curso del Estudiante"
            value={nuevoEstudiante.id_student_course}
            onChange={(e) =>
              setNuevoEstudiante({ ...nuevoEstudiante, id_student_course: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Estudiante"
            value={nuevoEstudiante.id_student}
            onChange={(e) =>
              setNuevoEstudiante({ ...nuevoEstudiante, id_student: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Curso"
            value={nuevoEstudiante.id_course}
            onChange={(e) =>
              setNuevoEstudiante({ ...nuevoEstudiante, id_course: e.target.value })
            }
          />
        </Grid>
      </Grid>
      <Box mt={2} className="Contenedor-CRUD-Button">
        <Button
          className="CRUD-Button"
          variant="contained"
          color="secondary"
          onClick={agregarEstudiante}
          style={{ display: estudianteSeleccionado ? "none" : "block" }}
        >
          Agregar
        </Button>
        <Button
          className="CRUD-Button"
          variant="contained"
          color="primary"
          onClick={actualizarEstudiante}
          style={{ display: estudianteSeleccionado ? "block" : "none" }}
        >
          Actualizar
        </Button>
        <Button
          className="CRUD-Button"
          variant="contained"
          color="error"
          onClick={eliminarEstudiante}
          style={{ display: estudianteSeleccionado ? "block" : "none" }}
        >
          Eliminar
        </Button>
      </Box>
    </Paper>
  );
}