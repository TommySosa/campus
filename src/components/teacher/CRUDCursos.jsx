"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography, Grid, Paper } from "@mui/material";



const CRUDCursos = (
  cursoSeleccionado,
  setCursoSeleccionado,
  cargarCursos,
  cursoActualizado
) => {
  const baseURL = "http://localhost:4000/api/courses/";

  const [nuevoCurso, setNuevoCurso] = useState({
    name: "",
    description: "",
    url_image: "",
    id_category: "",
  });

  useEffect(() => {
    if (cursoActualizado) {
      setNuevoCurso({
        name: cursoActualizado.name,
        description: cursoActualizado.description,
        url_image: cursoActualizado.url_image,
        id_category: cursoActualizado.id_category,
      });
    } else {
      setNuevoCurso({
        name: "",
        description: "",
        url_image: "",
        id_category: "",
      });
    }
  }, [cursoActualizado]);

  const AgregarCurso = () => {
    try {
      if (
        nuevoCurso.name &&
        nuevoCurso.description &&
        nuevoCurso.url_image &&
        nuevoCurso.id_category
      ) {
        const response = axios.post(baseURL, nuevoCurso);

        if (response.status === 200) {
          limpiarCampos();
          cargarCursos();
          alert("Curso agregado correctamente");
        }
      } else {
        alert("Por favor, complete todos los campos");
      }
    } catch (error) {
      console.error("Error al agregar el curso:", error);
    }
  };

  const eliminarCurso = () => {
    if (cursoSeleccionado) {
      try {
        const response = axios.delete(`${baseURL}${cursoSeleccionado}`);

        if (response.status === 204) {
          setCursoSeleccionado(null);
          limpiarCampos();
          cargarCursos();
          alert("Curso eliminado correctamente");
        }
      } catch (error) {
        console.error("Error al eliminar el curso:", error);
      }
    }
  };

  const actualizarCurso = () => {
    if (cursoSeleccionado) {
      try {
        axios.put(`${baseURL}${cursoSeleccionado}`, nuevoCurso);

        cargarCursos();
        limpiarCampos();
        setCursoSeleccionado(null);
        alert("Curso actualizado correctamente");
      } catch (error) {
        console.error("Error al actualizar el curso:", error);
      }
    }
  };

  const limpiarCampos = () => {
    setNuevoCurso({
      name: "",
      description: "",
      url_image: "",
      id_category: "",
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
        Agregar Curso
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nombre"
            value={nuevoCurso.name}
            onChange={(e) =>
              setNuevoCurso({ ...nuevoCurso, name: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Descripcion"
            value={nuevoCurso.description}
            onChange={(e) =>
              setNuevoCurso({ ...nuevoCurso, description: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="URL Image"
            value={nuevoCurso.url_image}
            onChange={(e) =>
              setNuevoCurso({ ...nuevoCurso, url_image: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Categoria"
            value={nuevoCurso.id_category}
            onChange={(e) =>
              setNuevoCurso({ ...nuevoCurso, id_category: e.target.value })
            }
          />
        </Grid>
      </Grid>
      <Box mt={2} className="Contenedor-CRUD-Button">
        <Button
          className="CRUD-Button"
          variant="contained"
          color="secondary"
          onClick={AgregarCurso}
          style={{ display: cursoSeleccionado ? "none" : "block" }}
        >
          Agregar
        </Button>
        <Button
          className="CRUD-Button"
          variant="contained"
          color="primary"
          onClick={actualizarCurso}
          style={{ display: cursoSeleccionado ? "block" : "none" }}
        >
          Actualizar
        </Button>
        <Button
          className="CRUD-Button"
          variant="contained"
          color="error"
          onClick={eliminarCurso}
          style={{ display: cursoSeleccionado ? "block" : "none" }}
        >
          Eliminar
        </Button>
      </Box>
    </Paper>
  );
};

export default CRUDCursos;
