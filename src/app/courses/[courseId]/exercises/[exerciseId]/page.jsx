export default async function Home({ params }) {
    const response = await fetch(`http://localhost:3000/api/exercises/${params.exerciseId}`);
    const data = await response.json();
    const exercise = data.data;

    if (data.data.error || exercise === null || !response.ok) {
        return (
            <div>
                <h1>Ejercicio no encontrado</h1>
                <p>Lo sentimos, el ejercicio que estás buscando no existe.</p>
            </div>
        );
    }

    return (
        <main>
            <div>
                <h1>Bienvenido al curso {exercise.name}!</h1>
                <p>{exercise.instruction}</p>
            </div>
        </main>
    );
}