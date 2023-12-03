import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "../../../../prisma/client"; // Ajusta la ruta según la ubicación de tu archivo PrismaClient

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const userFound = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!userFound) {
            throw new Error("Invalid credentials");
          }

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
    signIn: "/auth/login",
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
