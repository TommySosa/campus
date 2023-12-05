"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function Signin() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res?.error) setError(res.error)
    else{ return router.push("/courses")}
  };

  return (
  <div className=" items-center px-5 py-12 lg:px-20">
    <div className="flex flex-col w-full max-w-md p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-white rounded-lg md:mt-0">
        <div className="mt-8">
            <div className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                {error && <div classNameName="bg-red-500 text-white p-2 mb-2">{error}</div>}
                    <h1 className="text-center text-3xl">Formulario de login</h1>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-600"> Email </label>
                        <div className="mt-1">
                            <input name="email" type="email" autoComplete="email" required="" placeholder="Ecribe tu Email" className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"/>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="password" className="block text-sm font-medium text-neutral-600"> Contraseña </label>
                        <div className="mt-1">
                            <input name="password" type="password" autoComplete="current-password" required="" placeholder="Escribe tu Contraseña" className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"/>
                        </div>
                    </div>
                    <div>
                        <button className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Ingresar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  </div>
  );
}

export default Signin;
