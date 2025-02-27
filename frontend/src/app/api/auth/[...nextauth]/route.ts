import NextAuth, {nEXT} from "next-auth";
import Credentials from "next-auth/providers/credentials";

interface BackendResponseUser {
    accessToken: string;
    message: string;
}

export const options: NextAuthConfig= {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials: {email: string, password: string}){
                const {email, password} = credentials;
                if(!email || !password){
                    return null
                }

                const res = await fetch("https://c24-39-7-webapp.onrender.com/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({email, password})
                })

                const user = await res.json() as BackendResponseUser;
                
                if(res.ok && user){
                    return user
                }

                return null
            }
        })
    ],
    session:{
        strategy: "jwt",
    },
    callbacks:
};

const handler = NextAuth(options);
export {handler as GET, handler as POST};   