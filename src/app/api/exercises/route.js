import { NextResponse } from "next/server";

export async function GET(req){
    const res = await fetch("http://localhost:4001/api/exercises",{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();

    return NextResponse.json({
        success: true,
        data: data,
    })
}
// }