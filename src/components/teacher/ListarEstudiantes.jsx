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

const ListarEstudiantes = (estudianteSeleccionado,setEstudianteSeleccionado, estudiantes, actualizarEstudiante) => {

  const manejarCambioCheckbox = (id_student) => {
    if (estudianteSeleccionado === id_student){
      setEstudianteSeleccionado(null)
      actualizarEstudiante(null)
    }
    else{
      setEstudianteSeleccionado(id_student)
      const estudiante = estudiantes.find((estudiante) => estudiante.id_student === id_student)
      actualizarEstudiante(estudiante)
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
              <TableCell className="table-header">Curso del Estudiante</TableCell>
              <TableCell className="table-header">Estudiante</TableCell>
              <TableCell className="table-header">Curso</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {estudiantes.map((estudiante) => (
              <TableRow key={estudiante.id_student}>
                <TableCell>
                  <Checkbox
                    className="checkbox"
                    checked={estudianteSeleccionado === estudiante.id_student}
                    onChange={() => manejarCambioCheckbox(estudiante.id_student)}
                  />
                </TableCell>
                <TableCell>{estudiante.id_student_course}</TableCell>
                <TableCell>{estudiante.id_student}</TableCell>
                <TableCell>{estudiante.id_course}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default ListarEstudiantes