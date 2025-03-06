"use client"

import { useState, useTransition } from "react";

import { Button, Label, TextInput } from "flowbite-react";
import { HiLockClosed, HiMail } from "react-icons/hi";
import ErrorMessage from "@/components/error-message";
import { loginAction } from "@/server/actions/login-action";
import { useRouter } from "next/navigation";

type FormErrors = {
  _form?: string[];
  email?: string[]| undefined;
  password?:  string[]| undefined;
};

export default function LoginPage() {

  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<FormErrors|null>(null);
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await loginAction(formData);
      if(result && !result.success){
        setErrors(result.errors)
      } else {
        setErrors(null)
        router.push("/")
      }
    })
  }

  return (
    <section className="w-full h-screen flex flex-col md:flex-row justify-center items-center gap-8 md:gap-40 bg-gradient-to-r from-orange-900 via-orange-600 to-orange-500 p-8">
      <h1 className="text-5xl text-[#FFBA05] font[var(--lobster)]">Foody</h1>
      <form
        action={handleSubmit} noValidate
        className="flex flex-col gap-4 bg-[#FAFAF5] w-full max-w-md p-4 md:p-8 box-border overflow-hidden justify-between max-h-screen rounded-lg"
      >
        <div className="flex flex-col gap-2">
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Tu email"/>
          </div>
          <TextInput 
            className="dark:bg-gray-800 bg-transparent "
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
            <Label htmlFor="password1" value="Tu contraseña" />
          </div>
          <TextInput
            className="dark:bg-gray-800 bg-transparent "
            name="password"
            id="password1"
            type="password"
            rightIcon={HiLockClosed}
            placeholder="********"
            required disabled={isPending}
          />
          {errors?.password && <ErrorMessage message={errors.password[0]} />}
        </div>
        <Button className="mt-2 bg-primary text-white font-semibold" disabled={isPending} type="submit">
          {
            isPending ? "Cargando..." : "Iniciar sesión"
          }
        </Button>
        {errors?._form && <ErrorMessage message={errors._form[0]} />} <br />
      </form>
    </section>
  );
}
