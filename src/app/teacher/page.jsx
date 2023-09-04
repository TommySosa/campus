import Link from "next/link"

export default function Home() {
  return (
    <>
      <p>Teacher page</p>
      <Link href="/teacher/create-exercises">
        Crear ejercicios
      </Link>

      <Link href="/teacher/create-course">
        Crear curso
      </Link>
      
    </>
  )
}