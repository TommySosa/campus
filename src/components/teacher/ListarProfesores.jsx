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



const ListarProfesores = ({
  profesorSeleccionado,
  setProfesorSeleccionado,
  profesores,
  actualizarProfesor,
}) => {
  const manejarCambioCheckbox = (id_user) => {
    if (profesorSeleccionado === id_user) {
      setProfesorSeleccionado(null);
      actualizarProfesor(null);
    } else {
      setProfesorSeleccionado(id_user);
      const profesor = profesores.find(
        (profesor) => profesor.id_user === id_user
      );
      actualizarProfesor(profesor);
    }
  };

  const obtenerRol = (id_rol) => {
    return id_rol === 1 ? 'Estudiante' : id_rol === 2 ? 'Profesor' : 'Otro Rol';
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
              <TableCell className="table-header">Rol</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profesores.map((profesor) => (
              <TableRow key={profesor.id_user}>
                <TableCell>
                  <Checkbox
                    className="checkbox"
                    checked={profesorSeleccionado === profesor.id_user}
                    onChange={() => manejarCambioCheckbox(profesor.id_user)}
                  />
                </TableCell>
                <TableCell>{profesor.name}</TableCell>
                <TableCell>{profesor.surname}</TableCell>
                <TableCell>{obtenerRol(profesor.id_rol)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ListarProfesores;
