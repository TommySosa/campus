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
            });
            console.log(signupResponse);
            const res = await signIn("credentials", {
                email: signupResponse.data.email,
                password: formData.get("password"),
                redirect: false,
            });

            if (res?.ok) return router.push("/home");
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data.message;
                setError(errorMessage);
            }
        }
    };

    return (
        <div className="justify-center h-[calc(100vh-4rem)] flex items-center">
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
    );
}

export default Signup;