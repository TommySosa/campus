import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import axios from "axios";

export async function GET(req){
    const tag = req.nextUrl.searchParams.get('tag')
    revalidateTag(tag)
    const res = await fetch("http://localhost:4001/api/true_false",{
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

export async function POST(req) {
    const { id_exercise, true_option, false_option } = await req.json()
    try {
        const res = await axios.post("http://localhost:4001/api/true_false", {
            id_exercise,
            true_option,
            false_option
        })
        
        const newTrueOrFalse = res.data;
        return NextResponse.json({
            ...newTrueOrFalse
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json("")
    }
}