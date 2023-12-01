// import { PrismaClient } from "@prisma/client";
import prisma from '../../../../prisma/client';
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { name, surname, email, password, id_rol, dni } =
      await request.json();

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        name: name,
        surname: surname,
        email: email,
        password: hashedPassword,
        id_rol: 1,
        dni: parseInt(dni),
      },
    });

    return NextResponse.json(
      {
        name: newUser.name,
        surname: newUser.surname,
        email: newUser.email,
        id_rol: newUser.id_rol,
        dni: parseInt(newUser.dni),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  } finally {
    await prisma.$disconnect();
  }
}
