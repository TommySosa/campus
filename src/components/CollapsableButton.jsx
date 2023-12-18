import ModuleButton from './ModuleButton';


const CollapsableButton  = async() => {
    const res = await fetch('http://localhost:4000/api/modules', { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: 'no-store'
    })
    const data = await res.json()

    return (
        <div>
            {data.data.map((module) => (
                <ModuleButton key={module.id_module} module={module}/>
            ))}
        </div>
    );

};

export default CollapsableButton;
