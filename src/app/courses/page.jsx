import CourseCard from "@/components/Card";
export default function Home() {
    return (
        <section className="flex justify-center mt-12 flex-wrap">
            <CourseCard profe="Prof. Tomás Sosa" curso="English Course Level Basic" />
            <CourseCard profe="Prof. Yamila Lescano" curso="English Course Level Medium" />
            <CourseCard profe="Prof. Yamila Lescano" curso="English Course Level High" />
        </section>
    )
}