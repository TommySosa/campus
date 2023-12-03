import CourseContentPreview from "@/components/Content";

export default async function Home({ params }) {
    const responseContent = await fetch(`http://localhost:4001/api/contents/${params.courseId}`)
    const response = await fetch(`http://localhost:4000/api/courses/${params.courseId}`);
    
    if (!response.ok) {
      return (
        <div>
          <h1>Curso no encontrado</h1>
          <p>Lo sentimos, el curso que estás buscando no existe.</p>
        </div>
      );
    }
    const dataContent = await responseContent.json()
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
        <div>
          {
            dataContent.length > 0 ? dataContent.map((cont)=> (
              <div key={cont.id_content} className="mt-4">
                <CourseContentPreview title={cont.title} description={cont.description} pdfUrl={cont.pdf_url}/>
              </div>
            )) : <p>No hay contenido</p>
          } 
        </div>
      </div>
    );
  }
  