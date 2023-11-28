"use client";
import ButtonsCard from "@/components/ButtonsCard";
import { useSession } from "next-auth/react";
export default function Home() {
  const { data: session, status } = useSession();

  if (session && session.user.id_rol === 2) {
    return (
      <>
      </>
    );
  } else {
    return <h1>Acceso denegado asd</h1>;
  }
}
