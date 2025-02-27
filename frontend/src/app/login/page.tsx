
import {useState} from "react" 
import { Button, Label, Spinner, TextInput } from "flowbite-react";
import {HiUser, HiMail, HiIdentification} from "react-icons/hi";
import {useRouter} from "next/navigation"
import { z } from "zod";

const LoginSchema = z.object({
	email: z.string().min(1, "El email es requerido")
		.email("Formato de email inválido"),
	password: z.string().min(1, "La contraseña es requerida")
		.min(6, "La contraseña debe tener al menos 6 caracteres")
})

type FormErrors = {
	email?: string;
	password?: string;
}

export default function LoginPage(){
  const [errors, setErrors] = useState<FormErrors|null>(null)
  const [password,setPassword] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [serverError, setServerError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
	
  const handleSubmit = async (e: React.FormEvent)=>{
    e.preventDefault()
    setLoading(true)
    setErrors({})
    setServerError("")

    const validationResult = LoginSchema.safeParse({email, password})
    if(!validationResult.success){
      const formattedErrors = validationResult.error.flatten().fieldErrors;
          const simplifiedErrors: FormErrors = Object.entries(formattedErrors)
          .reduce((acc, [key, value]) => {
            acc[key as keyof FormErrors] = value?.[0];
            return acc;
          }, {} as FormErrors);
        
      setErrors(simplifiedErrors);
      setLoading(false);
      return;
    }

    // login con try
    try{
      const res = await fetch("https://c24-39-7-webapp.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
      }).then(res=>res.json())
      
      if(!res.ok){
        throw new Error(res.message ?? "Error al iniciar sesión")
      }
      
      // Guardar token en localstorage o estado global
      //localStorage.setItem("token", res.token)
      console.log(res)
      router.push("/")
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(e: any){
      console.error(e)
      setServerError(e.message!)
      setLoading(false)
    }
  }

   return ( 
   <section className="container h-screen flex justify-center items-center">
    <form onSubmit={handleSubmit}  className="flex md:max-w-lg w-[300px] flex-col gap-4"> 
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Tu email" />
        </div>
        <TextInput onChange={(e)=>setEmail(e.target.value)} name="email" id="email1" type="email" rightIcon={HiUser} placeholder="name@text.com" required />
        {
          errors?.email && <p className="text-red-500">{errors.email}</p>
        }
      </div>
      <div>
        <div className="mb-2 block">
          <Label className="dark:text-white" htmlFor="password1" value="Tu contraseña" />
        </div>
        <TextInput onChange={(e)=>setPassword(e.target.value)}  name="password" id="password1" type="password" rightIcon={HiMail} placeholder="********"  required />
        {
          errors?.password && <p className="text-red-500">{errors.password}</p>
        }
      </div>
      <Button className="mt-2" color="blue" type="submit">
        {loading ? <Spinner className="mr-2 size-2" /> : <HiIdentification className="mr-2 size-2" />}
        {loading ? "Cargando..." : "Iniciar sesión"}
      </Button>
      <div className="text-red-500 text-center h-6">
        {
          serverError && <p>{serverError}</p>
        }
      </div>
    </form>
  </section>
  );
}

