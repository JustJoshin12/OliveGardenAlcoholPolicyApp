// pages/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter your username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        // Find the user by username
        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });

        if (!user) {
          throw new Error("No user found with that username");
        }

        const isValid = bcrypt.compareSync(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid password");
        }

        // Return a custom user object with separate firstName and lastName
        return {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          username: user.username,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.username = user.username;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.username = token.username;
      session.user.email = token.email;
      session.user.name = token.name;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});
