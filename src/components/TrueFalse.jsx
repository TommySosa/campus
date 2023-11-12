export default async function TrueFalse({ trueFalseId, name, instruction }) {
    const trueFalseResponse = await fetch(`http://localhost:4000/api/trueFalse/${trueFalseId}`);
    const trueFalseData = await trueFalseResponse.json();
    const truefalse = trueFalseData.data;
    return (
        <div className="flex justify-center min-w-full">
            <div className="flex-col">
                <div className="text-xl ">
                    <h1>{name}</h1>
                    <br />
                    <p className="underline">{instruction}</p>
                    <br />
                </div>
                <div>
                    <div className="">
                        {
                            truefalse ? (
                                <div className="flex">
                                    <div className="flex-col">
                                        <div className="flex-row">
                                            <p>Opción 1: </p>
                                            {truefalse.true_option}
                                        </div>
                                        
                                        <div className="flex-row">
                                            <p>Opción 2: </p>
                                            {truefalse.false_option}
                                        </div>
                                    </div>
                                    <div className="flex-col">
                                        {/* <div className="flex-row"></div> */}
                                        <div className="flex-row">
                                            <input type="checkbox" />
                                        </div>
                                        <div className="flex-row">
                                            <input type="checkbox" />
                                        </div>
                                    </div>
                                </div>
                            ) : <div>No hay opciones</div>
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}