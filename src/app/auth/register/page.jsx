"use client";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function Signup() {
    const [error, setError] = useState();
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);
            const signupResponse = await axios.post("/api/auth/signup", {
                email: formData.get("email"),
                password: formData.get("password"),
                name: formData.get("name"),
                surname: formData.get("surname"),
                dni: formData.get("dni"),
                id_rol: 1,
            });
            console.log(signupResponse);
            const res = await signIn("credentials", {
                email: signupResponse.data.email,
                password: formData.get("password"),
                redirect: false,
            });
            // if (res?.error) setError(res.error)
            // else{ return router.push("/courses")}

             if (res.ok) return router.push("/courses");
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data.message;
                setError(errorMessage);
            } 
            
        }
    };

    return (
        <div class=" items-center px-5 py-12 lg:px-20">
<div class="flex flex-col w-full max-w-md p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-white rounded-lg md:mt-0">
    <div class="mt-8">
        <div class="mt-6">
            <form onSubmit={handleSubmit} class="space-y-6">
            {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
                <div>
                    <label for="name" class="block text-sm font-medium text-neutral-600">Nombre </label>
                    <div class="mt-1">
                        <input name="name" type="text" autocomplete="name" required="" placeholder="Escribe tu Nombre" class="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"/>
                    </div>
                </div>
                <div>
                    <label for="surname" class="block text-sm font-medium text-neutral-600"> Apellido </label>
                    <div class="mt-1">
                        <input name="surname" type="text" autocomplete="surname" required="" placeholder="Escribe tu Apellido" class="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"/>
                    </div>
                </div>
                <div>
                    <label for="dni" class="block text-sm font-medium text-neutral-600">Dni </label>
                    <div class="mt-1">
                        <input name="dni" type="text" autocomplete="dni" required="" placeholder="Escribe tu Dni" class="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"/>
                    </div>
                </div>
                <div>
                    <label for="email" class="block text-sm font-medium text-neutral-600"> Email </label>
                    <div class="mt-1">
                        <input name="email" type="email" autocomplete="email" required="" placeholder="Escribe tu Email" class="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"/>
                    </div>
                </div>

                <div class="space-y-1">
                    <label for="password" class="block text-sm font-medium text-neutral-600"> Contraseña </label>
                    <div class="mt-1">
                        <input name="password" type="password" autocomplete="current-password" required="" placeholder="Escribe tu Contraseña" class="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"/>
                    </div>
                </div>

                <div>
                    <button class="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Registrar</button>
                </div>
            </form>
        </div>
    </div>
</div>
</div>
    );
}

export default Signup;


{/* <div className="justify-center h-[calc(100vh-4rem)] flex items-center">
<form onSubmit={handleSubmit} className="bg-neutral-950 px-8 py-10 w-3/12">
    {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
    <h1 className="text-4xl font-bold mb-7">Signup</h1>

    <label className="text-slate-300">Name:</label>
    <input
        type="text"
        placeholder="Name"
        className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
        name="name"
    />

    <label className="text-slate-300">Surname:</label>
    <input
        type="text"
        placeholder="Surname"
        className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
        name="surname"
    />

    <label className="text-slate-300">Email:</label>
    <input
        type="email"
        placeholder="Email"
        className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
        name="email"
    />

    <label className="text-slate-300">Password:</label>
    <input
        type="password"
        placeholder="Password"
        className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
        name="password"
    />

    <button className="bg-blue-500 text-white px-4 py-2 block w-full mt-4">
        Signup
    </button>
</form>
</div>


//   <main className='flex items-center justify-center ' style={{ height: '80vh' }}>
//   <form onSubmit={handleSubmit} className="form_main before:bg-elf-green-300">
//     <p className="heading">Inicia sesión</p>
//     <div className="inputContainer">
//       <svg className="inputIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2e2e2e" viewBox="0 0 16 16">
//         <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
//       </svg>
//       <input type="text" className="inputField" id="email" placeholder="Email" name="email"/>
//     </div>

//     <div className="inputContainer">
//       <svg className="inputIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2e2e2e" viewBox="0 0 16 16">
//         <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
//       </svg>
//       <input type="password" className="inputField" id="password" placeholder="Password" name="password"/>
//     </div>
//     <button id="button" className="bg-elf-green-500 hover:bg-elf-green-600">Entrar</button>
//     <a className="forgotLink" href="#">Olvidaste tu contraseña?</a>
//   </form>
// </main> */}