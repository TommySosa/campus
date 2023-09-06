import CreateExerciseForm from "@/components/CreateExerciseForm";

export default function Home() {
    return (
        <main className="bg-elf-green-500 rounded-xl h-[85vh] max-sm:h-full max-sm:pb-2 text-zinc-600">
            <h1 className="text-lg text-center">Crear ejercicios</h1>
            <section className="flex justify-center">
                <CreateExerciseForm />
            </section>
        </main>
    )
}