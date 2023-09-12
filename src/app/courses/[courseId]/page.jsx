export default async function Home({ params }) {
    const response = await fetch(`http://localhost:3000/api/courses/${params.courseId}`);
    
    if (!response.ok) {
      return (
        <div>
          <h1>Curso no encontrado</h1>
          <p>Lo sentimos, el curso que estás buscando no existe.</p>
        </div>
      );
    }
  
    const data = await response.json();
  
    if (!data.data) {
      return (
        <div>
          <h1>Curso no encontrado</h1>
          <p>Lo sentimos, el curso que estás buscando no existe.</p>
        </div>
      );
    }
  
    const course = data.data;
  
    return (
      <div>
        <h1>Bienvenido al curso {course.name}!</h1>
        <p>{course.description}</p>
      </div>
    );
  }
  