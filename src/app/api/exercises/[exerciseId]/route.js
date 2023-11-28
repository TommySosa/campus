import { NextResponse } from "next/server";

export async function GET(req, {params}){

    const res = await fetch(`http://localhost:4001/api/exercises/${params.exerciseId}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: 'no-store'
    });
    
    const data = await res.json();

    return NextResponse.json({
        data
    })
}