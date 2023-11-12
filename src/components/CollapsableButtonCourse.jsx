import ModuleButton from './ModuleButton';
import Spinner from './Spinner';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function CollapsableButtonCourse({id_params}) {
    const { data, error, isLoading } = useSWR(`/api/modules/${id_params}`, fetcher);

    if (error) return <div>failed to load</div>
    if (isLoading) return <Spinner />

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

