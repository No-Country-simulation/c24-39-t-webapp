import { api } from "@/server/service"
import Link from "next/link"

export default async function Page({ params }: {params: {id:string}}) {
    const {id} = await params
    const restaurant = await api.restaurant.get(Number(id))
    
    return (
        <main className="h-screen w-full md:w-[760px] text-black p-2 md:p-6 mx-auto flex 
		flex-col align-center bg-gray-200/50 border border-primary"
	>
	<div><Link className="transition-colors hover:bg-gray-200/60 hover:border-black/80 px-3 py-2 text-black decoration-none  rounded-full border border-black" href="/">Volver</Link></div>
	<div className="w-full flex mb-2 justify-center items-center" >
	    <img height="360px" className="object-cover w-[70%] md:w-[50%]" src={restaurant.logo} alt={`Logo de ${restaurant.name}`} />
	</div>
            <h1 className="leading-2 text-center text-2xl md:text-5xl font-bold">{restaurant.name}</h1>
            <p className="text-center md:text-2xl text-black/70 ">{restaurant.description}</p>
	    <section>
		contenido menu
	    </section>
        </main>
    )
}
