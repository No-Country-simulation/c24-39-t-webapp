import { redirect } from "next/navigation"
import { auth } from "../../../auth"
import { Role } from "@/utils/constants"
import Sidebar from "@/components/sidebar-dashboard"
import {HR} from "flowbite-react"

export default async function DashboardPage(){
    const session = await auth()

    if(!session || !session.user) {
        redirect("/login")
    }

    if(session.user.role !== Role.Restaurant) {
        //redirect("/perfil")
        console.log("Usuario entro al panel cuidadooo!!")
    }

return <main className="text-black flex w-full h-screen">
        <Sidebar />
        <div className="bg-gray-200/50 p-4 flex-1">
	    <h1 className="text-3xl font-bold leading-2">Panel de control</h1>
      		<HR className="bg-black/30" />
	    <h2 className="text-2xl font-semibold leading-2 mb-2">Crear nuevo restaurante</h2>
	    <button className="bg-transparent hover:bg-gray-100 flex items-center justify-center text-xl font-semibold h-[80px] w-[200px] rounded border border-black hover:border-primary hover:text-primary transition-colors">+</button> 
	    <h2 className="text-2xl font-semibold leading-2 my-2" >Tus restaurantes</h2>      
	    <div className="flex gap-4">
		<div className="flex items-center justify-center text-xl font-semibold h-[80px] w-[200px] rounded border border-black">Restaurant 1</div>
		<div className="flex items-center justify-center text-xl font-semibold h-[80px] w-[200px] rounded border border-black">Restaurant 2</div>
	    </div>
	</div>
    </main>
}
