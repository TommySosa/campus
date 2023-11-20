"use client"
import { useSession, signOut } from "next-auth/react";

export default function ProfileData() {
    const { data: session, status } = useSession();
    return (
        <>
            <div className="mt-20 text-center border-b pb-12">
                {
                    session ? (
                        <h1 className="text-4xl font-medium text-gray-700">{session.user.name}, <span className="font-light text-gray-500">27</span></h1>) : null
                }
                <p className="font-light text-gray-600 mt-3">Bucharest, Romania</p>

                <p className="mt-8 text-gray-500">Solution Manager - Creative Tim Officer</p>
                <p className="mt-2 text-gray-500">University of Computer Science {session.user.id_rol}</p>
            </div>

            <div className="mt-12 flex flex-col justify-center">
                <p className="text-gray-600 text-center font-light lg:px-16">An artist of considerable range, Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of considerable range.</p>
                <button
                    className="text-indigo-500 py-2 px-4  font-medium mt-4"
                >
                    Show more
                </button>
            </div>
        </>
    )
}