'use client'
import React from 'react'
import Image from 'next/image'
import { useSession, signOut } from "next-auth/react";



export default function ProfileImage(){
    const { data: session, status } = useSession();
  return (
    <>
    <div className="mt-20 text-center border-b pb-12">
                {
                    session.user.profile_url != null ? (
                        <img className="w-48 h-48 rounded-full" src={session.user.profile_url}/>
                        
                        ) : <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 6a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg> 
                }
    </div>
    </>
  )
}


