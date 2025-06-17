import { getUser } from "@/api/services/User";
import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { compare } from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await getUser(credentials?.email!);
        if (!user) throw new Error("Email nuk ekziston");

        const isValid = await compare(credentials!.password, user.password);
        if (!isValid) throw new Error("Fjalëkalimi nuk është i saktë");

        return {
          id: user._id.toString(),
          email: user.email,
          emailVerified: user.emailVerified ?? null,
          role: user.role ?? "user", // include role here
        };
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,

  // Add role to token and session
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role ?? "user"; // Attach role to token
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role ;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
