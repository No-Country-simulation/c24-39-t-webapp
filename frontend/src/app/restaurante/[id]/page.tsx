import { api } from "@/server/service"

export default async function Page({ params }: {params: {id:string}}) {
    const {id} = await params
    const restaurant = await api.restaurant.get(Number(id))
    
    return (
        <main>
            <h1>{restaurant.name}</h1>
            <p>{restaurant.description}</p>

        </main>
    )
}
