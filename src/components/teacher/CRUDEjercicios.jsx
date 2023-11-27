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

const CRUDEjercicios = ({
  ejercicioSeleccionado,
  setEjercicioSeleccionado,
  cargarEjercicios,
  ejercicioActualizado,
  modulos,
  tipos,
}) => {
  const baseURL = "http://localhost:4001/api/exercises";

  const [nuevoEjercicio, setNuevoEjercicio] = useState({
    name: "",
    instruction: "",
    id_module: "",
    id_type: "",
  });

  useEffect(() => {
    if (ejercicioActualizado) {
      setNuevoEjercicio({
        name: ejercicioActualizado.name,
        instruction: ejercicioActualizado.instruction,
        id_module: ejercicioActualizado.id_module,
        id_type: ejercicioActualizado.id_type,
      });
    } else {
      setNuevoEjercicio({
        name: "",
        instruction: "",
        id_module: "",
        id_type: "",
      });
    }
  }, [ejercicioActualizado]);

  const agregarEjercicio = async () => {
    try {
      if (
        nuevoEjercicio.name &&
        nuevoEjercicio.instruction &&
        nuevoEjercicio.id_module &&
        nuevoEjercicio.id_type
      ) {
        const response = await axios.post(baseURL, nuevoEjercicio);

        if (response.status === 200) {
          limpiarCampos();
          cargarEjercicios();
          alert("Ejercicio agregado correctamente");
        }
      } else {
        alert("Por favor, complete todos los campos");
      }
    } catch (error) {
      console.error("Error al agregar el ejercicio: ", error);
    }
  };

  const eliminarEjercicio = async () => {
    if (ejercicioSeleccionado) {
      try {
        const response = await axios.delete(
          `${baseURL}${ejercicioSeleccionado}`
        );

        if (response.status === 204) {
          setEjercicioSeleccionado(null);
          limpiarCampos();
          cargarEjercicios();
          alert("Ejercicio eliminado correctamente");
        }
      } catch (error) {
        console.error("Error al eliminar el ejercicio:", error);
      }
    }
  };

  const actualizarEjercicio = async () => {
    if (ejercicioSeleccionado) {
      try {
        await axios.put(`${baseURL}${ejercicioSeleccionado}`, nuevoEjercicio);
        await cargarEjercicios();
        limpiarCampos();
        setEjercicioSeleccionado(null);
        alert("Ejercicio actualizado correctamente");
      } catch (error) {
        console.error("Error al actualizar el ejercicio:", error);
      }
    }
  };

  const limpiarCampos = () => {
    setNuevoEjercicio({
      name: "",
      instruction: "",
      id_module: "",
      id_type: "",
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
        Agregar Ejercicio
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nombre"
            value={nuevoEjercicio.name}
            onChange={(e) =>
              setNuevoEjercicio({ ...nuevoEjercicio, name: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Instruccion"
            value={nuevoEjercicio.instruction}
            onChange={(e) =>
              setNuevoEjercicio({
                ...nuevoEjercicio,
                instruction: e.target.value,
              })
            }
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            label="Modulo"
            value={nuevoEjercicio.id_module}
            onChange={(e) =>
              setNuevoEjercicio({
                ...nuevoEjercicio,
                id_module: parseInt(e.target.value),
              })
            }
          >
            {modulos.map((modulo) => (
              <MenuItem key={modulo.id_module} value={modulo.id_module}>
                {modulo.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            label="Tipo"
            value={nuevoEjercicio.id_type}
            onChange={(e) =>
              setNuevoEjercicio({
                ...nuevoEjercicio,
                id_type: parseInt(e.target.value),
              })
            }
          >
            {tipos.map((tipo) => (
              <MenuItem key={tipo.id_type} value={tipo.id_type}>
                {tipo.name}
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
          onClick={agregarEjercicio}
          style={{ display: ejercicioSeleccionado ? "none" : "block" }}
        >
          Agregar
        </Button>
        <Button
          className="CRUD-Button"
          variant="contained"
          color="primary"
          onClick={actualizarEjercicio}
          style={{ display: ejercicioSeleccionado ? "block" : "none" }}
        >
          Actualizar
        </Button>
        <Button
          className="CRUD-Button"
          variant="contained"
          color="error"
          onClick={eliminarEjercicio}
          style={{ display: ejercicioSeleccionado ? "block" : "none" }}
        >
          Eliminar
        </Button>
      </Box>
    </Paper>
  );
};

export default CRUDEjercicios;
