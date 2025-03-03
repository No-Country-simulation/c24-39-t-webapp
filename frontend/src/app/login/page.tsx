"use client"

import { useState, useTransition } from "react";

import { Button, Label, TextInput } from "flowbite-react";
import { HiClock, HiMail } from "react-icons/hi";
import ErrorMessage from "@/components/error-message";
import { loginAction } from "@/server/actions/login-action";

type FormErrors = {
  _form?: string[];
  email?: string[]| undefined;
  password?:  string[]| undefined;
};

export default function LoginPage() {

   const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<FormErrors|null>(null);

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await loginAction(formData);
      if(result && !result.success){
        setErrors(result.errors)
      } else {
        setErrors(null)
      }
    })
  }

  return (
    <section className="container h-screen flex justify-center items-center">
      <form
        action={handleSubmit} noValidate
        className="flex md:max-w-lg w-[300px] flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Tu email" />
          </div>
          <TextInput 
            name="email" 
            id="email1" 
            type="email" 
            rightIcon={HiMail} 
            placeholder="name@text.com" 
            required disabled={isPending}
          />
          {errors?.email && <ErrorMessage message={errors.email[0]} />}
        </div>
        <div className="flex flex-col gap-2">
          <div className="mb-2 block">
            <Label className="dark:text-white" htmlFor="password1" value="Tu contraseña" />
          </div>
          <TextInput
            name="password"
            id="password1"
            type="password"
            rightIcon={HiClock}
            placeholder="********"
            required disabled={isPending}
          />
          {errors?.password && <ErrorMessage message={errors.password[0]} />}
        </div>
        {errors?._form && <ErrorMessage message={errors._form[0]} />} <br />
        <Button className="mt-2" disabled={isPending} color="blue" type="submit">
          {
            isPending ? "Cargando..." : "Iniciar sesión"
          }
        </Button>
      </form>
    </section>
  );
}
