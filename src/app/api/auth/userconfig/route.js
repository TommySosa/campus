import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import {pool} from "../../../../db.js"

// const express = require('express');
// const router = express.Router();
// const pool = ('../../../../db'); // Asegúrate de que la ruta sea correcta
// const bcrypt = require('bcrypt');

const handler = NextAuth({
    providers: [
      CredentialsProvider({
        name: "Credentials",
        id: "credentials",
        credentials: {
          password: {type: "password" },
        },
        async authorize(credentials) {
  
          try {
            // pool.connect();
            const [rows] = await pool.query(
              "SELECT * FROM users WHERE password = ?",
              [credentials.password]
            );
  
            if (rows.length === 0) {
              throw new Error("Invalid credentials");
            }
  
            const userFound = rows[0];
            const passwordMatch = await bcrypt.compare(
              credentials.password,
              userFound.password
            );
  
            if (!passwordMatch) {
              throw new Error("Invalid credentials");
            }
  
            return userFound;
          } catch (error) {
            throw error;
          } 
        },
      }),
    ],
    pages: {
      signIn: "/auth/userconfig",
    },
    session: {
      strategy: "jwt",
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) token.user = user;
        return token;
      },
      async session({ session, token }) {
        session.user = token.user;
        return session;
      },
    },
  });
  
  export { handler as GET, handler as POST };






