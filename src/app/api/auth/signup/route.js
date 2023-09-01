import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { pool } from '../../../../db.js'

export async function POST(request) {
    try {
        const { name, surname, email, password, id_rol } = await request.json();

        if (password < 6)
            return NextResponse.json(
                { message: "Password must be at least 6 characters" },
                { status: 400 }
            );

        if (password.length < 6) {
            return NextResponse.json(
                { message: "Password must be at least 6 characters" },
                { status: 400 }
            );
        }

        const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

        if (rows.length > 0) {
            return NextResponse.json(
                {
                    message: "Email already exists",
                },
                {
                    status: 409,
                }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await pool.query("INSERT INTO users (name, surname, email, password, id_rol) VALUES (?, ?, ?, ?, ?)", [
            name,
            surname,
            email,
            hashedPassword,
            id_rol
        ]);

        // pool.end();

        return NextResponse.json(
            {
                name,
                surname,
                email,
                id_rol
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}