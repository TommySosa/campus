"use client";
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

const ListarCursos = ({
  cursoSeleccionado,
  setCursoSeleccionado,
  cursos,
  actualizarCurso,
}) => {
  const manejarCambioCheckbox = (id_course) => {
    if (cursoSeleccionado === id_course) {
      setCursoSeleccionado(null);
      actualizarCurso(null);
    } else {
      setCursoSeleccionado(id_course);
      const curso = cursos.find((curso) => curso.id_course === id_course);
      actualizarCurso(curso);
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: "400px", overflowY: "auto" }}
    >
      <Table className="table-content">
        <TableHead>
          <TableRow>
            <TableCell className="table-header"></TableCell>
            <TableCell className="table-header">Nombre</TableCell>
            <TableCell className="table-header">Descripcion</TableCell>
            <TableCell className="table-header">Categoria</TableCell>
            <TableCell className="table-header">Profesores</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cursos.map((curso) => (
            <TableRow key={curso.id_course}>
              <TableCell>
                <Checkbox
                  className="checkbox"
                  checked={cursoSeleccionado === curso.id_course}
                  onChange={() => manejarCambioCheckbox(curso.id_course)}
                />
              </TableCell>
              <TableCell>{curso.name}</TableCell>
              <TableCell>{curso.description}</TableCell>
              <TableCell>{curso.id_category}</TableCell>
              <TableCell>{curso.id_user}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListarCursos;
