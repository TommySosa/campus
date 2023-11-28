"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Paper,
  MenuItem,
} from "@mui/material";

export default function CRUDEstudiantes({
  estudianteSeleccionado,
  setEstudianteSeleccionado,
  cargarEstudiantes,
  estudianteActualizado,
  cursos,
}) {
  const baseURL = "http://localhost:4001/api/students";

  const [nuevoEstudiante, setNuevoEstudiante] = useState({
    name: "",
    surname: "",
    id_course: "",
  });

  useEffect(() => {
    if (estudianteSeleccionado) {
      setNuevoEstudiante({
        name: estudianteActualizado.name,
        surname: estudianteActualizado.surname,
      });
    } else {
      setNuevoEstudiante({
        name: "",
        surname: "",
      });
    }
  }, [estudianteActualizado]);

  const inscribirUsuario = async () => {  
    try {
      // Suponiendo que nuevoEstudiante contiene los datos necesarios para la inscripción
      const response = await axios.post(baseURL, {
        id_user: estudianteSeleccionado, // Suponiendo que contiene el ID del usuario
        id_course: nuevoEstudiante.id_course, // Suponiendo que contiene el ID del curso
      });
  
      if (response.status === 200) {
        // Realiza las acciones necesarias si la inscripción se realiza con éxito
        limpiarCampos();
        cargarEstudiantes();
        setEstudianteSeleccionado(null)
        alert("Usuario inscripto correctamente");
      }
    } catch (error) {
      console.error("Error al inscribir el usuario:", error);
      // Maneja el error si la inscripción falla
    }
  };
  
  const limpiarCampos = () => {
    setNuevoEstudiante({
      name: "",
      surname: "",
      id_course:""
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 2, bgcolor: "background.paper" }}>
      <Typography
        className="titulo-crud"
        variant="h6"
        component="div"
        sx={{ color: "text.primary" }}
      >
        Incribir Usuario
      </Typography>
      <Grid container spacing={2}>
      <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nombre"
            value={nuevoEstudiante.name}
            onChange={(e) =>
              setNuevoEstudiante({
                ...nuevoEstudiante,
                name: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Apellido"
            value={nuevoEstudiante.surname}
            onChange={(e) =>
              setNuevoEstudiante({ ...nuevoEstudiante, surname: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            label="Cursos"
            value={nuevoEstudiante.id_course}
            onChange={(e) =>
              setNuevoEstudiante({
                ...nuevoEstudiante,
                id_course: parseInt(e.target.value),
              })
            }
          >
            {cursos.map((curso) => (
              <MenuItem key={curso.id_course} value={curso.id_course}>
                {curso.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Box mt={2} className="Contenedor-CRUD-Button">
        <Button
          className="CRUD-Button"
          variant="contained"
          color="secondary"
          onClick={inscribirUsuario}
        >
          Inscribir
        </Button>
      </Box>
    </Paper>
  );
}
