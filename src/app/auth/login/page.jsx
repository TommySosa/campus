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


    //if (res?.ok) return router.push("/home");
  };

  return (
  <div class=" items-center px-5 py-12 lg:px-20">
    <div class="flex flex-col w-full max-w-md p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-white rounded-lg md:mt-0">
        <div class="mt-8">
            <div class="mt-6">
                <form onSubmit={handleSubmit} class="space-y-6">
                {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
                    <div>
                        <label for="email" class="block text-sm font-medium text-neutral-600"> Email </label>
                        <div class="mt-1">
                            <input name="email" type="email" autocomplete="email" required="" placeholder="Ecribe tu Email" class="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"/>
                        </div>
                    </div>

                    <div class="space-y-1">
                        <label for="password" class="block text-sm font-medium text-neutral-600"> Contraseña </label>
                        <div class="mt-1">
                            <input name="password" type="password" autocomplete="current-password" required="" placeholder="Escribe tu Contraseña" class="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"/>
                        </div>
                    </div>

                    {/* <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" placeholder="Your password" class="w-4 h-4 text-blue-600 border-gray-200 rounded focus:ring-blue-500"/>
                            <label for="remember-me" class="block ml-2 text-sm text-neutral-600"> Remember me </label>
                        </div>

                        <div class="text-sm">
                            <a href="#" class="font-medium text-blue-600 hover:text-blue-500"> Forgot your password? </a>
                        </div>
                    </div> */}

                    <div>
                        <button class="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Ingresar</button>
                    </div>
                </form>
                <div class="relative my-4">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center text-sm">
                        <span class="px-2 text-neutral-600 bg-white"> Or continue with </span>
                    </div>
                </div>
                <div>
                    <button type="submit" class="w-full items-center block px-10 py-3.5 text-base font-medium text-center text-blue-600 transition duration-500 ease-in-out transform border-2 border-white shadow-md rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                        <div class="flex items-center justify-center">
                            {/* <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="w-6 h-6" viewBox="0 0 48 48">
                                <defs>
                                    <path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"></path>
                                </defs>
                                <clipPath id="b">
                                    <use xlink:href="#a" overflow="visible"></use>
                                </clipPath>
                                <path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"></path>
                                <path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"></path>
                                <path clip-path="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"></path>
                                <path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"></path>
                            </svg> */}
                            <span class="ml-4"> Log in with Google</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
  </div>
  );
}

export default Signin;

{/* <div className="justify-center h-[calc(100vh-4rem)] flex items-center">
<form
  onSubmit={handleSubmit}
  className="bg-neutral-950 px-8 py-10 w-3/12"
>
  {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
  <h1 className="text-4xl font-bold mb-7">Signin</h1>

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
//     {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
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
//     <button className="bg-elf-green-500 hover:bg-elf-green-600">Entrar</button>
//     <a className="forgotLink" href="#">Olvidaste tu contraseña?</a>
//   </form>
// </main> */}