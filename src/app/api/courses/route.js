import { NextResponse } from "next/server";

export async function GET(req){
    const res = await fetch("http://localhost:4001/api/courses",{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            cache: 'no-store'
        },
    });
    const data = await res.json();

    return NextResponse.json({
        success: true,
        data: data,
    })
}

