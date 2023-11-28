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
  Checkbox,
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
  const multipleURL = "http://localhost:4001/api/multiple"
  const trueOrFalseURL = "http://localhost:4001/api/true_false"

  const [nuevoEjercicio, setNuevoEjercicio] = useState({
    name: "",
    instruction: "",
    id_module: "",
    id_type: "",
  });

  const [formData, setFormData] = useState({
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctOption1: false,
    correctOption2: false,
  });

  const [formData2, setFormData2] = useState({
    true_option: "",
    false_option: ""
  })

  const [idTipo, setTipo] = useState()

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

        const multipleBody = {
          options: [
            { text: formData.option1, correct: formData.correctOption1 },
            { text: formData.option2, correct: formData.correctOption2 },
            { text: formData.option3, correct: false },
            { text: formData.option4, correct: false },
          ],
        };
        const createExerciseResponse = await axios.post(baseURL, nuevoEjercicio);

        if (createExerciseResponse.status === 200) {
          if (createExerciseResponse.data.id_type === 1) {
            try {
              const multipleResponse = await axios.post(multipleURL, {
                id_exercise: await createExerciseResponse.data.id_exercise,
                options: multipleBody.options
              })
              limpiarCampos()
              cargarEjercicios()
              alert('Ejercicio multiple choise agregado correctamente')
              console.log('Multiple response', multipleResponse.data);
            } catch (error) {
              console.log('MULTIPLE ERROR', error);
            }
          }
          else if (createExerciseResponse.data.id_type === 2) {
            try {
              const trueOrFalseResponse = await axios.post(trueOrFalseURL, {
                id_exercise: await createExerciseResponse.data.id_exercise,
                true_option: formData2.true_option,
                false_option: formData2.false_option
              })
              limpiarCampos()
              cargarEjercicios()
              alert('Ejercicio verdadero o falso agregado correctamente')
              console.log('Verdadero o falso response', trueOrFalseResponse.data);
            } catch (error) {
              console.log('TRUE OR FALSE', error);
            }
          }
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
    setFormData({
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correctOption1: false,
      correctOption2: false,
    })
  };

  const handleChangeType = (e) => {
    setTipo(e.target.value)
    console.log('VALOR TIPO', idTipo)
    setNuevoEjercicio({
      ...nuevoEjercicio,
      id_type: parseInt(e.target.value),
    })
    console.log('aqui');

  }

  const handleInputChange = (event, optionType) => {
    const isChecked = event.target.checked;

    setFormData({
      ...formData,
      [optionType]: isChecked,
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
            onChange={handleChangeType
            }
          >
            {tipos.map((tipo) => (
              <MenuItem key={tipo.id_type} value={tipo.id_type}>
                {tipo.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {
          idTipo === 1 ? (
            <>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  sx={{ width: '70%' }}
                  label="Opcion 1"
                  value={formData.option1}
                  onChange={(e) => setFormData({ ...formData, option1: e.target.value })}
                />
                <Checkbox
                  className="checkbox"
                  checked={formData.correctOption1}
                  onChange={(e) => handleInputChange(e, 'correctOption1')}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  size="small"
                  sx={{ width: '70%' }}
                  label="Opcion 2"
                  value={formData.option2}
                  onChange={(e) => setFormData({ ...formData, option2: e.target.value })}
                />
                <Checkbox
                  className="checkbox"
                  checked={formData.correctOption2}
                  onChange={(e) => handleInputChange(e, 'correctOption2')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  sx={{ width: '70%' }}
                  label="Opcion 3"
                  value={formData.option3}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      option3: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  sx={{ width: '70%' }}
                  label="Opcion 4"
                  value={formData.option4}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      option4: e.target.value,
                    })
                  }
                />
              </Grid></>
          ) : null
        }
        {
          idTipo === 2 ? (
            <>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  sx={{ width: '70%' }}
                  label="Verdadera: "
                  value={formData2.true_option}
                  onChange={(e) => setFormData2({ ...formData2, true_option: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  sx={{ width: '70%' }}
                  label="Falsa: "
                  value={formData2.false_option}
                  onChange={(e) => setFormData2({ ...formData2, false_option: e.target.value })}
                />
              </Grid>
            </>
          ) : null
        }


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
