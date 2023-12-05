"use client";
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from 'react-hook-form';

function Signup() {
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm();
    const [error, setError] = useState();
    const router = useRouter();
    const [genres, setGenres] = useState()
    const [userData, setUserData] = useState({
        name: "",
        surname: "",
        email: "",
        dni: 0,
        password: "",
        id_rol: 1,
        id_genre: 0
    })

    // useEffect(() => {
    //     async function fetchGenres() {
    //         const response = await axios.get('http://localhost:4001/api/genres')
    //         const data = await response.data
    //         console.log(data);
    //         setGenres(data)
    //     }
    //     fetchGenres()
    // }, [])

    const onSubmit = async (formData) => {
        try {
            const signupResponse = await axios.post("/api/auth/signup", {
                name: formData.name,
                surname: formData.surname,
                dni: parseInt(formData.dni),
                email: formData.email,
                password: formData.password,
                genre: formData.genre,

            });
            console.log(signupResponse);
            const res = await signIn("credentials", {
                email: signupResponse.data.email,
                password: formData.password,
                redirect: false,
            });
    
            if (res.ok) return router.push("/courses");
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data.message;
                setError(errorMessage);
            }
        }
    };
    

    const password = watch('password');

    return (
        <div className=" items-center px-5 py-12 lg:px-20">
            <div className="flex flex-col w-full xs:max-w-md md:w-3/4 p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-white rounded-lg md:mt-0">
                <div className="mt-2">
                    <div className="">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
                            <h1 className="text-center text-3xl">Formulario de registro</h1>
                            <div className="md:w-1/2 mx-auto">
                                <div>
                                    <label htmlFor="name" className=" text-sm font-medium text-neutral-600">Nombre </label>
                                    <div className="mt-1">
                                        <Controller
                                            control={control}
                                            name="name"
                                            rules={{ required: 'Este campo es obligatorio' }}
                                            render={({ field }) => (
                                                <input
                                                    {...field}
                                                    type="text"
                                                    autoComplete="name"
                                                    placeholder="Escribe tu Nombre"
                                                    className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                                                />
                                            )}
                                        />
                                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="surname" className=" text-sm font-medium text-neutral-600"> Apellido </label>
                                    <div className="mt-1">
                                        <Controller
                                            control={control}
                                            name="surname"
                                            rules={{ required: 'Este campo es obligatorio' }}
                                            render={({ field }) => (
                                                <input
                                                    {...field}
                                                    type="text"
                                                    autoComplete="surname"
                                                    placeholder="Escribe tu apellido"
                                                    className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                                                />
                                            )}
                                        />
                                        {errors.surname && <p className="text-red-500">{errors.surname.message}</p>}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="dni" className=" text-sm font-medium text-neutral-600">DNI </label>
                                    <div className="mt-1">
                                        <Controller
                                            control={control}
                                            name="dni"
                                            rules={{ required: 'Este campo es obligatorio' }}
                                            render={({ field }) => (
                                                <input
                                                    {...field}
                                                    type="text"
                                                    autoComplete="dni"
                                                    placeholder="Escribe tu dni"
                                                    className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                                                />
                                            )}
                                        />
                                        {errors.dni && <p className="text-red-500">{errors.dni.message}</p>}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className=" text-sm font-medium text-neutral-600"> Email </label>
                                    <div className="mt-1">
                                        <Controller
                                            control={control}
                                            name="email"
                                            rules={{ required: 'Este campo es obligatorio' }}
                                            render={({ field }) => (
                                                <input
                                                    {...field}
                                                    type="email"
                                                    autoComplete="email"
                                                    placeholder="Escribe tu email"
                                                    className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                                                />
                                            )}
                                        />
                                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="password" className="text-sm font-medium text-neutral-600">Contraseña</label>
                                    <div className="mt-1">
                                        <Controller
                                            control={control}
                                            name="password"
                                            rules={{
                                                required: 'Este campo es obligatorio',
                                                minLength: {
                                                    value: 6,
                                                    message: 'La contraseña debe tener al menos 6 caracteres',
                                                },
                                            }}
                                            render={({ field }) => (
                                                <input
                                                    {...field}
                                                    type="password"
                                                    autoComplete="current-password"
                                                    placeholder="Escribe tu Contraseña"
                                                    className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                                                />
                                            )}
                                        />
                                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label htmlFor="confirmPassword" className="text-sm font-medium text-neutral-600">Confirma la contraseña</label>
                                    <div className="mt-1">
                                        <Controller
                                            control={control}
                                            name="confirmPassword"
                                            rules={{
                                                required: 'Este campo es obligatorio',
                                                validate: value => value === password || 'Las contraseñas no coinciden',
                                            }}
                                            render={({ field }) => (
                                                <input
                                                    {...field}
                                                    type="password"
                                                    autoComplete="current-password"
                                                    placeholder="Confirma tu Contraseña"
                                                    className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                                                />
                                            )}
                                        />
                                        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label htmlFor="genre" className="text-sm font-medium text-neutral-600">Género</label>
                                    <div className="mt-1">
                                        <Controller
                                            control={control}
                                            name="genre"
                                            rules={{ required: 'Seleccione su género' }}
                                            render={({ field }) => (
                                                <select
                                                    {...field}
                                                    className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                                                >
                                                    <option value="">Seleccione su género</option>
                                                    <option value="Masculino">Masculino</option>
                                                    <option value="Femenino">Femenino</option>
                                                    <option value="No binario">No binario</option>
                                                    <option value="Prefiero no decirlo">Prefiero no decirlo</option>
                                                    {/* {genres && genres.length > 0 ? genres.map((genre) => (
                                                        <option key={genre.id_genre} value={genre.id_genre}>{genre.name}</option>
                                                    )) : null} */}
                                                </select>
                                            )}
                                        />
                                        {errors.genre && <p className="text-red-500">{errors.genre.message}</p>}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button type="submit" onClick={handleSubmit} className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Registrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;


