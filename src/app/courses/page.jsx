import CourseCard from "@/components/Card";
export default async function Home() {
    const courseResponse = await fetch("http://localhost:4001/api/user-courses/4",{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: 'no-store'
    });
    const data = await courseResponse.json();
    // console.log('DATA',data);
    const courses = data;

    return (
        <section className="flex justify-center mt-12 flex-wrap">
            {
                courses.length > 0 ?
                courses.map((course) => (
                    <CourseCard key={course.id_course} course={course}/>
                )) : null
            }
        </section>
    )
}