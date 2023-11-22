"use client"
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";

const ListarEjercicios = ({ejercicioSeleccionado, setEjercicioSeleccionado, ejercicios, actualizarEjercicio}) => {

  const manejarCambioCheckbox = (id_exercise) => {
    if (ejercicioSeleccionado === id_exercise) {
      setEjercicioSeleccionado(null)
      actualizarEjercicio(null)
    }
    else{
      setEjercicioSeleccionado(id_exercise)
      const ejercicio = ejercicios.find((ejercicio) => ejercicio.id_exercise === id_exercise)
      actualizarEjercicio(ejercicio)
    }
  }

  return (
    <>
      <TableContainer
        component={Paper}
        className="scrollable-table"
        style={{ maxHeight: "400px", overflowY: "auto" }}
      >
        <Table className="table-content">
          <TableHead>
            <TableRow>
              <TableCell className="table-header"></TableCell>
              <TableCell className="table-header">Nombre</TableCell>
              <TableCell className="table-header">Instruccion</TableCell>
              <TableCell className="table-header">Modulo</TableCell>
              <TableCell className="table-header">Tipo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ejercicios.map((ejercicio) => (
              <TableRow key={ejercicio.id_exercise}>
                <TableCell>
                  <Checkbox
                    className="checkbox"
                    checked={ejercicioSeleccionado === ejercicio.id_exercise}
                    onChange={() => manejarCambioCheckbox(ejercicio.id_exercise)}
                  />
                </TableCell>
                <TableCell>{ejercicio.name}</TableCell>
                <TableCell>{ejercicio.instruction}</TableCell>
                <TableCell>{ejercicio.id_module}</TableCell>
                <TableCell>{ejercicio.id_type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default ListarEjercicios