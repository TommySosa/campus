"use client";
import Spinner from "@/components/Spinner";
import CrudLayout from "@/components/teacher/CrudLayout";
import { useSession } from "next-auth/react";
export default function Home() {
  const { data: session, status } = useSession();

  if(status === "loading") { return <Spinner/>}

  if (session && session.user.id_rol === 2) {
    return (
      <CrudLayout />
    );
  } else {
    return <h1>Acceso denegado</h1>;
  }
}
