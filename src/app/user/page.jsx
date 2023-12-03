"use client"
import { useSession } from "next-auth/react";
import ProfileData from "@/components/ProfileData";
// import defaultImage from '../assets/default_profile.webp'

export default function Home() {

    const { data: session, status } = useSession();
    const image = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    return (
        <main className="sm:px-16 sm:py-8 p-2">
            <section className="p-8 bg-white shadow ">
                <div className="flex justify-center">
                    <img className="w-48 h-48 rounded-full flex items-center justify-center " src={session.user.profile_url ? session.user.profile_url : image} />
                    {/* <ProfileImage /> */}
                </div>
                <ProfileData />
            </section>
        </main>
        
    )
}