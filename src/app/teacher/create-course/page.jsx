import CreateCourseForm from "@/components/CreateCourseForm";

export default function CreateCoursePage() {
    return (
        <main className="bg-elf-green-500 rounded-xl h-[85vh] max-sm:h-full max-sm:pb-2 text-zinc-600">
            <h1 className="text-lg text-center">Crear curso</h1>
            <section className="flex justify-center">
                <CreateCourseForm />
            </section>
        </main>
    );
}