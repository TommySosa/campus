"use client"
import ModuleButton from './ModuleButton';
import Spinner from './Spinner';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function CollapsableButtonCourse({ id_params }) {
    const { data, error, isLoading } = useSWR(`/api/modules/${id_params}`, fetcher);
    const { data: session, status } = useSession();

    const isModuleCompleted = async (previousModuleId) => {
        try {
            const response = await fetch('http://localhost:4001/api/modules/check/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_user: session.user.id_user,
                    id_module: previousModuleId,
                }),
            });

            const result = await response.json();
            return result.total_realizados === result.total_modulo;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    if (error) return <div>failed to load</div>;
    if (isLoading) return <Spinner />;

    return (
        <div>
            {data?.data?.length > 0 ? (
                data.data.map((module, index) => (
                    <ModuleButton
                        key={module.id_module}
                        module={module}
                        isModuleCompleted={() => isModuleCompleted(index > 0 ? data.data[index - 1].id_module : null)}
                        id_params={id_params}
                        data={data}
                        index={index}
                        previousModuleId={index > 0 ? data.data[index - 1].id_module : null}
                    />
                ))
            ) : (
                <div>No hay módulos</div>
            )}
        </div>
    );

}
