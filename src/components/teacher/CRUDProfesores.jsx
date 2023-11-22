"use client"
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { TextField, Button, Box, Typography, Grid, Paper } from "@mui/material";

const CRUDProfesores = (profesorSeleccionado, setProfesorSeleccionado, cargarProfresores, profesorActualizado) => {

  const baseURL = "http://localhost:4000/api/teachers"

  const [nuevoProfesor, setNuevoProfesor] = useState({
    id_teacher_course:"",
    id_teacher:"",
    id_course:"",
  })

  useEffect(() => {
    if(profesorSeleccionado){
      setNuevoProfesor({
        id_teacher_course: profesorActualizado.id_teacher_course,
        id_teacher: profesorActualizado.id_teacher,
        id_course: profesorActualizado.id_course
      })
    } else {
      setNuevoProfesor({
        id_teacher_course:"",
    id_teacher:"",
    id_course:"",
      })
    }
  }, [profesorActualizado])

  const agregarProfesor = async () => {
    try {
      if(nuevoProfesor.id_teacher_course && nuevoProfesor.id_teacher && nuevoProfesor.id_course){
        const response = await axios.post(baseURL,nuevoProfesor)

        if (response.status === 200){
          limpiarCampos()
          cargarProfresores()
          alert("Profesor agregado correctamente")
        }
      } else {
        alert("Por favor, complete todos los campos")
      }
    } catch (error) {
      console.error("Error al agregar el profesor:", error);
      
    }
  }

  const eliminarProfesor = async () => {
    if(profesorSeleccionado){
      try {
        const response = await axios.delete(`${baseURL}${profesorSeleccionado}`)

        if (response.status === 204){
          setProfesorSeleccionado(null)
          limpiarCampos()
          cargarProfresores()
          alert("Profesor eliminado correctamente")
        }
      } catch (error) {
        console.error("Error al eliminar el profesor:", error);
        
      }
    }


  }

  const actualizarProfesor = async () => {
    if(profesorSeleccionado){
      try {
        await axios.put(`${baseURL}${profesorSeleccionado}`,nuevoProfesor)

        await cargarProfresores()
        limpiarCampos()
        setProfesorSeleccionado(null)
        alert("Profesor actualizado correctamente")
      } catch (error) {
        console.error("Error al actualizar el libro:", error);
        
      }
    }


  }

  const limpiarCampos = () => {
    setNuevoProfesor({
      id_teacher_course:"",
      id_teacher:"",
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
        Agregar Profesor
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Curso del Profesor"
            value={nuevoProfesor.id_teacher_course}
            onChange={(e) =>
              setNuevoProfesor({ ...nuevoProfesor, id_teacher_course: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Profesor"
            value={nuevoProfesor.id_teacher}
            onChange={(e) =>
              setNuevoProfesor({ ...nuevoProfesor, id_teacher: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Curso"
            value={nuevoProfesor.id_course}
            onChange={(e) =>
              setNuevoProfesor({ ...nuevoProfesor, id_course: e.target.value })
            }
          />
        </Grid>
      </Grid>
      <Box mt={2} className="Contenedor-CRUD-Button">
        <Button
          className="CRUD-Button"
          variant="contained"
          color="secondary"
          onClick={agregarProfesor}
          style={{ display: profesorSeleccionado ? "none" : "block" }}
        >
          Agregar
        </Button>
        <Button
          className="CRUD-Button"
          variant="contained"
          color="primary"
          onClick={actualizarProfesor}
          style={{ display: profesorSeleccionado ? "block" : "none" }}
        >
          Actualizar
        </Button>
        <Button
          className="CRUD-Button"
          variant="contained"
          color="error"
          onClick={eliminarProfesor}
          style={{ display: profesorSeleccionado ? "block" : "none" }}
        >
          Eliminar
        </Button>
      </Box>
    </Paper>
  );
}

export default CRUDProfesores