import useSWR from 'swr';
import Spinner from './Spinner';
import ModuleButton from './ModuleButton';

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default async function CollapsableButtonCourse({id_params}) {
    // const { data, error, isLoading } = useSWR(`/api/modules/${id_params}`, fetcher);

    const response = await fetch(`/api/modules/${id_params}`)
    const data = await response.json();

    // fetch(`/api/modules/${id_params}`)
    //     .then(async response => {
    //         const data = await response.json()

    //         return (
    //             <div>
    //                 {
    //                 data.data.length > 0 ? (
    //                     data.data.map((module) => (
    //                         <ModuleButton key={module.id_module} module={module}/>
    //                     ))
    //                 ) : <div>No hay módulos</div>
    //                 }
    //             </div>
    //         );
    //     })
    //     .catch(error => {
    //         console.log(error);
    //         return <div>failed to load</div>
    //     });
    

    // if (error) return <div>failed to load</div>
    // if (isLoading) return <Spinner />

    return (
        <div>
            {
            data.data.length > 0 ? (
                data.data.map((module) => (
                    <ModuleButton key={module.id_module} module={module}/>
                ))
            ) : <div>No hay módulos</div>
            }
        </div>
    );

};

