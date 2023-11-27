"use client"
import { useState } from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const Navbar = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <AppBar position="static" sx={{ background: '#149696' }}>
      <Toolbar sx={{ justifyContent: 'space-evenly' }}>
        <Button
          color="inherit"
          className={selectedButton === 'cursos' ? 'boton-navbar selected' : 'boton-navbar'}
          onClick={() => handleButtonClick('cursos')}
        >
          <Link href="/teacher/cursos">Cursos</Link>
        </Button>
        <Button
          color="inherit"
          className={selectedButton === 'ejercicios' ? 'boton-navbar selected' : 'boton-navbar'}
          onClick={() => handleButtonClick('ejercicios')}
        >
          <Link href="/teacher/ejercicios">Ejercicios</Link>
        </Button>
        <Button
          color="inherit"
          className={selectedButton === 'estudiantes' ? 'boton-navbar selected' : 'boton-navbar'}
          onClick={() => handleButtonClick('estudiantes')}
        >
          <Link href="/teacher/estudiantes">Estudiantes</Link>
        </Button>
        <Button
          color="inherit"
          className={selectedButton === 'profesores' ? 'boton-navbar selected' : 'boton-navbar'}
          onClick={() => handleButtonClick('profesores')}
        >
          <Link href="/teacher/profesores">Profesores</Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
