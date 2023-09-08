import CourseCard from "@/components/Card";
export default async function Home() {
    const response = await fetch("http://localhost:3000/api/courses");
    const data = await response.json();
    const courses = data.data;

    return (
        <section className="flex justify-center mt-12 flex-wrap">
            {
                courses.length > 0 ?
                courses.map((course) => (
                    <CourseCard key={course.id_course} profe={course.professor} curso={course.name} />
                )) : null
            }
        </section>
    )
}