import Multiple from "@/components/Multiple";
import TrueFalse from "@/components/TrueFalse";

export default async function Home({ params }) {
    const response = await fetch(`http://localhost:4000/api/exercises/${params.exerciseId}`);
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
        <main className="flex justify-center items-center w-full h-full">
            <div>
                {
                    //Si es multiple choise
                    exercise.id_type === 1 ? 
                    (
                        <Multiple id={params.exerciseId} name={exercise.name} instruction={exercise.instruction}/>
                    ) : null
                }
                {
                    //Si es verdadero o falso
                    exercise.id_type === 2 ?
                    (
                        <TrueFalse trueFalseId={params.exerciseId} name={exercise.name} instruction={exercise.instruction}/>
                    ) : null
                }
                
                
            </div>
        </main>
    );
}