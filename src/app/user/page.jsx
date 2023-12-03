"use client"
import { useSession } from "next-auth/react";
import ProfileData from "@/components/ProfileData";

export default function Home() {

    const { data: session, status } = useSession();
    return (
        <main className="sm:px-16 sm:py-8 p-2">
            <section className="p-8 bg-white shadow ">
                <div className="flex justify-center">
                    <img className="w-48 h-48 rounded-full flex items-center justify-center " src={session.user.profile_url} />
                    {/* <ProfileImage /> */}
                </div>
                <ProfileData />
            </section>
        </main>
        
    )
}