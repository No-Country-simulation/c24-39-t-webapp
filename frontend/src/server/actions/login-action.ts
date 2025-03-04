import { signIn } from "next-auth/react"
import {redirect} from "next/navigation" 
import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().min(1, "El email es requerido")
    .email("Formato de email inválido"),
  password: z.string().min(1, "La contraseña es requerida")
    .min(4, "La contraseña debe tener al menos 4 caracteres"),
});

export const loginAction = async (formdata: FormData) => {
    const rawData = {
        email: formdata.get("email") as string,
        password: formdata.get("password") as string,
    }

    const result = LoginSchema.safeParse(rawData)

    if(!result.success){
        return {
            success:false,
            errors: result.error.flatten().fieldErrors
        }
    }

    const {email, password} = result.data
    const loginResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
    })

    if(loginResult?.error){
        return {
            success: false,
            errors: {_form: ["Credenciales inválidas"]}
        }
    }

    if(loginResult?.ok){
        redirect("/")
    }

    return {
        success: true,
        errors: {_form: ["Error inesperado al iniciar sesión"]}
    }
    
}