import ButtonsCard from "@/components/ButtonsCard"

export default function Home() {
  return (
    <>
      <ButtonsCard title="Cursos" firstButton={{color: "blue", label: "Crear", href:"/teacher/create-course"}}
      secondButton={{color: "green", label: "Editar", href:"/teacher/edit-course"}}
      thirdButton={{color: "red", label: "Borrar", href:"/teacher/delete-course"}}
      fourthButton={{color: "yellow", label: "Ver", href:"/teacher/view-course"}}
      />
      <ButtonsCard title="Ejercicios" firstButton={{color: "blue", label: "Crear", href:"/teacher/create-exercise"}}
      secondButton={{color: "green", label: "Editar", href:"/teacher/edit-exercise"}}
      thirdButton={{color: "red", label: "Borrar", href:"/teacher/delete-exercise"}}
      fourthButton={{color: "yellow", label: "Ver", href:"/teacher/view-exercise"}}
      />
      <ButtonsCard title="Alumnos" firstButton={{color: "blue", label: "Asignar cursos", href:"/teacher/create-student"}}
      secondButton={{color: "green", label: "Cambiar cursos", href:"/teacher/edit-student"}}
      thirdButton={{color: "red", label: "Dar de baja", href:"/teacher/delete-student"}}
      fourthButton={{color: "yellow", label: "Ver", href:"/teacher/view-student"}}
      />
      <ButtonsCard title="Profesores" firstButton={{color: "blue", label: "Asignar cursos", href: "/teacher/create-teacher"}}
      secondButton={{color: "green", label: "Cambiar cursos", href: "/teacher/edit-teacher"}}
      thirdButton={{color: "red", label: "Dar de baja", href: "/teacher/delete-teacher"}}
      fourthButton={{color: "yellow", label: "Ver", href: "/teacher/view-teacher"}}
      />
    </>
  )
}