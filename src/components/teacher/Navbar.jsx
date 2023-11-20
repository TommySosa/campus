"use client"
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ background: '#149696'/*, '&:hover': { background: 'bg-elf-green-dark' }*/ }} >
      <Toolbar>
        <Button color="inherit">
          <Link href="/teacher/cursos">Cursos</Link>
        </Button>
        <Button color="inherit">
          <Link href="/teacher/ejercicios">Ejercicios</Link>
        </Button>
        <Button color="inherit">
          <Link href="/teacher/estudiantes">Estudiantes</Link>
        </Button>
        <Button color="inherit">
          <Link href="/teacher/profesores">Profesores</Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
