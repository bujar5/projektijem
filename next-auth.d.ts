// next-auth.d.ts
import { DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      /** The user's role. */
      role?: "user" | "admin";
    } & DefaultSession["user"];
  }

  // THIS IS CRUCIAL: ENSURE THIS IS UNCOMMENTED AND CORRECT
  interface User {
    role?: "user" | "admin";
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role?: "user" | "admin";
  }
}