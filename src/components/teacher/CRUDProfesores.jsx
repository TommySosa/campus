"use client";
import React, { useEffect, useState } from "react";
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



const CRUDProfesores = ({
  profesorSeleccionado,
  setProfesorSeleccionado,
  cargarProfesores,
  profesorActualizado,
}) => {
  const baseURL = "http://localhost:4001/api/users";

  const [nuevoProfesor, setNuevoProfesor] = useState({
    name: "",
    surname: "",
    id_rol: "",
  });

  useEffect(() => {
    if (profesorSeleccionado) {
      setNuevoProfesor({
        name: profesorActualizado.name,
        surname: profesorActualizado.surname,
        id_rol: profesorActualizado.id_rol,
      });
    } else {
      setNuevoProfesor({
        name: "",
        surname: "",
        id_rol: "",
      });
    }
  }, [profesorActualizado]);

  const cambiarRol = async () => {
    if (profesorSeleccionado) {
      try {
        if (
          nuevoProfesor.name &&
          nuevoProfesor.surname &&
          nuevoProfesor.id_rol
        ) {
          // Obtén el ID del profesor seleccionado
          const idProfesor = profesorSeleccionado; // Asegúrate de usar la propiedad correcta para obtener el ID

          // Realiza una solicitud PUT a tu endpoint de cambio de roles en la API
          await axios.patch(`${baseURL}/${idProfesor}`, {
            id_rol: nuevoProfesor.id_rol, // Envia el nuevo rol del profesor
          });

          // Vuelve a cargar la lista de profesores después de cambiar el rol
          setProfesorSeleccionado(null);
          limpiarCampos();
          alert("Rol actualizado correctamente");
          cargarProfesores();
        } else {
          alert("Por favor, complete todos los campos");
        }
      } catch (error) {
        console.error("Error al actualizar el rol del profesor:", error);
        // Maneja el error en caso de que la solicitud falle
      }
    }
  };

  const limpiarCampos = () => {
    setNuevoProfesor({
      name: "",
      surname: "",
      id_rol: "",
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
        Cambiar Rol
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nombre"
            value={nuevoProfesor.name}
            onChange={(e) =>
              setNuevoProfesor({
                ...nuevoProfesor,
                name: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Apellido"
            value={nuevoProfesor.surname}
            onChange={(e) =>
              setNuevoProfesor({ ...nuevoProfesor, surname: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            label="Rol"
            value={nuevoProfesor.id_rol}
            onChange={(e) =>
              setNuevoProfesor({
                ...nuevoProfesor,
                id_rol: parseInt(e.target.value),
              })
            }
          >
            <MenuItem value={1}>Estudiante</MenuItem>
            <MenuItem value={2}>Profesor</MenuItem>
          </TextField>
        </Grid>
      </Grid>
      <Box mt={2} className="Contenedor-CRUD-Button">
        <Button
          className="CRUD-Button"
          variant="contained"
          color="secondary"
          onClick={cambiarRol}
        >
          Cambiar Rol
        </Button>
      </Box>
    </Paper>
  );
};

export default CRUDProfesores;
