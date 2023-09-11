import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import axios from "axios";

export async function POST(req){
    const data = req.body
    // const tag = req.nextUrl.searchParams.get('tag')
    // revalidateTag(tag)
    // const res = await fetch("http://localhost:3001/api/exercises",{
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    // });
    // const data = await res.json();

    axios.post("http://localhost:3001/api/exercises", data)
    .then(res => {
        console.log(res);
        console.log(res.data);
    }
    )
    
}