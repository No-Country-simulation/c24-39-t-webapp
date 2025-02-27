import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface JWT {
    accessToken?: string;
    message: string;
  }

  interface Session {
    accessToken?: string | undefined;
    user?: {
      id?: string;
      email?: string;
      role?: string;
    };
  }

  interface User extends BackendUser {
    accessToken?: string;
    message: string;
  }
}

type BackendUser = {
  accessToken?: string;
  message: string;
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
        const res = await fetch("https://c24-39-t-webapp.onrender.com/auth/login", {
          method: "POST",
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        const user: BackendUser = await res.json();

        if (res.ok && user.accessToken) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "http://localhost:3000/login",
  },
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
});
