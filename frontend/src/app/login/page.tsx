import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { HiUser, HiMail, HiIdentification } from "react-icons/hi";

import { z } from "zod";
import { signIn } from "../../../auth";
import {redirect} from "next/navigation"

const LoginSchema = z.object({
  email: z.string().min(1, "El email es requerido").email("Formato de email inválido"),
  password: z.string().min(1, "La contraseña es requerida").min(6, "La contraseña debe tener al menos 6 caracteres"),
});

/** type FormErrors = {
  email?: string;
  password?: string;
};*/

export default function LoginPage() {
  return (
    <section className="container h-screen flex justify-center items-center">
      <form
        action={async (formdata: FormData) => {
          "use server";
	  console.log("Entro login")
           try{
	    await signIn("credentials", {
	      email: formdata.get("email"),
	      password: formdata.get("password"),
	      redirect: false,	
	    })
		redirect("/")
	   }
	   catch(err){console.log("error completo:", err)}
          
        }}
        className="flex md:max-w-lg w-[300px] flex-col gap-4"
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Tu email" />
          </div>
          <TextInput name="email" id="email1" type="email" rightIcon={HiUser} placeholder="name@text.com" required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label className="dark:text-white" htmlFor="password1" value="Tu contraseña" />
          </div>
          <TextInput
            name="password"
            id="password1"
            type="password"
            rightIcon={HiMail}
            placeholder="********"
            required
          />
        </div>
        <Button className="mt-2" color="blue" type="submit">
          Iniciar sesión
        </Button>
      </form>
    </section>
  );
}
