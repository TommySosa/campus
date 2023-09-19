import Multiple from "@/components/Multiple";

export default async function Home({ params }) {
    const response = await fetch(`http://localhost:3000/api/exercises/${params.exerciseId}`);
    const data = await response.json();
    const exercise = data.data;

    console.log('DATA', exercise);

    if (data.data.error || exercise === null || !response.ok) {
        return (
            <div>
                <h1>Ejercicio no encontrado</h1>
                <p>Lo sentimos, el ejercicio que estás buscando no existe.</p>
            </div>
        );
    }

    // if(multipleData.data.error || multiple === null || !multipleResponse.ok) {
    //     return (
    //         <div>
    //             <h1>Ejercicio no encontrado</h1>
    //             <p>Lo sentimos, el ejercicio que estás buscando no existe.</p>
    //         </div>
    //     );
    // }
    return (
        <main>
            <div>
                <h1>{exercise.name}</h1>
                <p>{exercise.instruction}</p>
            </div>
            <div>
                {
                    exercise.id_type === 1 ? 
                    (
                        <Multiple id={params.exerciseId}/>
                    ) : <p>No es un multiple choise</p>
                }
                
                
            </div>
        </main>
    );
}