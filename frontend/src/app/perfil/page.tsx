import Link from "next/link";
import { auth } from "../../../auth";
import { Role } from "@/utils/constants";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    
    const session = await auth();
    if(!session || !session.user) {
        return <section className="flex flex-col items-center justify-center h-screen w-full">
            <h2 className="text-3xl font-semibold">Usuario no autenticado.</h2>
            <p>Por favor, inicia sesión para ver tu perfil.</p>
            <div className="flex gap-4 justify-center items-center">
                <Link className="text-accent font-semibold hover:text-accent/80" 
                    href="/login">Iniciar sesión
                </Link>
                <Link className="text-accent font-semibold hover:text-accent/80" 
                    href="/registrarse">Registarse
                </Link>
                <Link className="text-accent font-semibold hover:text-accent/80" 
                    href="/">Inicio
                </Link>    
            </div>  
        </section>
    }

    if(session.user.role === Role.Restaurant) {
        redirect("/dashboard")
    }

    const userData = session.user;
    
    return (
        <section className="flex flex-col justify-center h-screen w-full">
            <h1 className="text-4xl font-semibold">Perfil</h1>
            <p>Nombre: {userData.name}</p>
            <p>Email: {userData.email}</p>
            <p>Dirección: {userData.address}</p>
            <p>Num. Tel: {userData.phone}</p>        
        </section>
    );
}