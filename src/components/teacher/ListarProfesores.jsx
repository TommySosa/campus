"use client"
import React from 'react'
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



const ListarProfesores = (profesorSeleccionado, setProfesorSeleccionado, profesores, actualizarProfesor) => {

  const manejarCambioCheckbox = (id_teacher) => {
    if (profesorSeleccionado === id_teacher) {
      setProfesorSeleccionado(null)
      actualizarProfesor(null)
    } else {
      setProfesorSeleccionado(id_teacher)
      const profesor = profesores.find((profesor) => profesor.id_teacher === id_teacher)
      actualizarProfesor(profesor)
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
              <TableCell className="table-header">Curso del Profesor</TableCell>
              <TableCell className="table-header">Profesor</TableCell>
              <TableCell className="table-header">Curso</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profesores.map((profesor) => (
              <TableRow key={profesor.id_teacher}>
                <TableCell>
                  <Checkbox
                    className="checkbox"
                    checked={profesorSeleccionado === profesor.id_teacher}
                    onChange={() => manejarCambioCheckbox(profesor.id_teacher)}
                  />
                </TableCell>
                <TableCell>{profesor.id_teacher_course}</TableCell>
                <TableCell>{profesor.id_teacher}</TableCell>
                <TableCell>{profesor.id_course}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default ListarProfesores