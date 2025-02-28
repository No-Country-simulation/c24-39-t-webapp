import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface JWT {
    access_token?: string;
    message: string;
  }

  interface Session {
    access_token?: string | undefined;
    user?: {
      id?: string;
      email?: string;
      role?: string;
    };
  }

  interface User extends BackendUser {
    access_token?: string;
    message: string;
  }
}

type BackendUser = {
  access_token?: string;
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
	// console.log("USUARIOOOO:", user)

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
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.access_token = user.access_token;
      	// aca agregar al token los demas datos del usuario
      }
      return token;
    },
    async session({ session, token }) {
      session.access_token = token.access_token as string;
	// aca agregar a la session los demas dato del usuario
      return session;
    },
  },
});
