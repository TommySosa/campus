import useSWR from 'swr';
import Spinner from './Spinner';
import ModuleButton from './ModuleButton';

// const fetcher = (...args) => fetch(...args).then(res => res.json())

const CollapsableButton  = async() => {
    // const { data, error, isLoading } = useSWR('/api/modules', fetcher);

    // if (error) return <div>failed to load</div>
    // if (isLoading) return <Spinner />
    const res = await fetch('http://localhost:4000/api/modules', { next: { tags: ['collection'] } })
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
