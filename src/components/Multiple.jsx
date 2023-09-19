export default async function Multiple({id}) {
    const multipleResponse = await fetch(`http://localhost:3000/api/multiple/${id}`);
    const multipleData = await multipleResponse.json();
    const multiple = multipleData.data;
    console.log('MULTIPLE', multiple);
    return (
        <div>
            <h2>Multiple</h2>
            {
                multiple.options.length > 0 ? (
                    multiple.options.map((opcion, index) => <p key={opcion.id_exercise}>{opcion.text}</p>)) : <div>No hay opciones</div>
            }
        </div>
    )
}