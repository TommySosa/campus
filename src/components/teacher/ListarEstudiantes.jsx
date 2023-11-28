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

const ListarEstudiantes = ({
  estudianteSeleccionado,
  setEstudianteSeleccionado,
  estudiantes,
  actualizarEstudiante,
}) => {
  const manejarCambioCheckbox = (id_user) => {
    if (estudianteSeleccionado === id_user) {
      setEstudianteSeleccionado(null);
      actualizarEstudiante(null);
    } else {
      setEstudianteSeleccionado(id_user);
      const estudiante = estudiantes.find(
        (estudiante) => estudiante.id_user === id_user
      );
      actualizarEstudiante(estudiante);
    }
  };

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
              <TableCell className="table-header">Apellido</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {estudiantes.map((estudiante) => (
              <TableRow key={estudiante.id_user}>
                <TableCell>
                  <Checkbox
                    className="checkbox"
                    checked={estudianteSeleccionado === estudiante.id_user}
                    onChange={() =>
                      manejarCambioCheckbox(estudiante.id_user)
                    }
                  />
                </TableCell>
                <TableCell>{estudiante.name}</TableCell>
                <TableCell>{estudiante.surname}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ListarEstudiantes;
