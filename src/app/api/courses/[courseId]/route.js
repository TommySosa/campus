import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET(req, {params}){
    const tag = req.nextUrl.searchParams.get('tag')
    revalidateTag(tag)
    const res = await fetch(`http://localhost:3001/api/courses/${params.courseId}`,{
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