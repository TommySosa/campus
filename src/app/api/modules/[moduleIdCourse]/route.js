import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET(req, {params}){
    const tag = req.nextUrl.searchParams.get('tag')
    revalidateTag(tag)
    const res = await fetch(`http://localhost:4001/api/modules/${params.moduleIdCourse}`,{
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