import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AdapterUser } from "next-auth/adapters";
import { URL_BACKEND } from "@/utils/constants";

declare module "next-auth" {
  interface JWT {
    access_token?: string;
    //message: string;
    user: CustomUser
  }

  interface Session {
    access_token?: string;
    user: CustomUser
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface User extends BackendUser {}
}



type CustomUser = AdapterUser & {
  id: string | number;
  email: string;
  role: string;
  phone: string;
  name: string;
  address: string;
}

type BackendUser = {
  access_token?: string;
  message: string;
  user: CustomUser
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const res = await fetch(`${URL_BACKEND}/auth/login`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        const user: BackendUser = await res.json();

        if (res.ok && user.access_token) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.access_token = user.access_token;
        token.user = user.user
      }
      return token;
    },
    async session({ session, token }) {
      session.access_token = token.access_token as string
      session.user = token.user as CustomUser
      return session;
    },
  },
});
