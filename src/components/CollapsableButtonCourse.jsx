import useSWR from 'swr';
import Spinner from './Spinner';
import ModuleButton from './ModuleButton';

const fetcher = (...args) => fetch(...args).then(res => res.json())

const CollapsableButtonCourse = ({id_params}) => {
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

export default CollapsableButtonCourse;
