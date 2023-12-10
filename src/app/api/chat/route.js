import { NextResponse } from "next/server";
// import openai from "@/utils/openai";
import openai from "@/app/utils/openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

export async function POST(req) {
    const { content, id_type } = await req.json();

    if (typeof content !== "string" || content.trim() === "" || id_type === 0 || id_type === undefined) {
        return NextResponse.json(
            { message: "Content is required" },
            { status: 400 }
        );
    }
    if(id_type === 1){
        try {
            const response = await openai.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content:
                        `Eres un asistente para crear ejercicios en un campus virtual, eres experto en ${content}`,
                    },
                    {
                        role: "user",
                        content: `Escribe un nombre muy cortito y una consigna para un ejercicio multiple choise con 4 opciones donde 1 es correcta y las demás son falsas, de forma concisa sobre ${content}. Para solo tildar la correcta, no para completar la frase.
                        NO ESCRIBAS "" ni ''.Siempre con el formato a)Correcta: Opción correcta, b) Incorrecta: Opción incorrecta, etc. y para la consigna Consigna: Consigna concisa, y para el nombre Nombre: `,
                    },
    
                ],
                model: "gpt-3.5-turbo",
                stream: true,
                max_tokens: 120,
                temperature: 0.6,
            });
    
            const stream = OpenAIStream(response);
    
            return new StreamingTextResponse(stream);
        } catch (error) {
            console.error("Error en la solicitud:", error);
            return NextResponse.json(
                { message: "Internal Server Error" },
                { status: 500 }
            );
        }
    }else{
        try {
            const response = await openai.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content:
                        `Eres un asistente para crear ejercicios en un campus virtual, eres experto en ${content}`,
                    },
                    {
                        role: "user",
                        content: `Escribe un nombre muy cortito y una consigna para un ejercicio verdadero o falso, de forma concisa sobre ${content}, escribe las dos opciones. Para solo tildar la correcta, no para completar la frase.
                        NO ESCRIBAS "" ni ''.Siempre con el formato a)Verdadera: Opción verdadera, b) Falsa: Opción falsa, y para la consigna Consigna: Consigna concisa, y para el nombre Nombre: nombre conciso`,
                    },
    
                ],
                model: "gpt-3.5-turbo",
                stream: true,
                max_tokens: 120,
                temperature: 0.6,
            });
    
            const stream = OpenAIStream(response);
    
            return new StreamingTextResponse(stream);
        } catch (error) {
            console.error("Error en la solicitud:", error);
            return NextResponse.json(
                { message: "Internal Server Error" },
                { status: 500 }
            );
        }
    }
}

