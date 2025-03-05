import { redirect } from "next/navigation"
import { auth } from "../../../auth"
import LogoutButton from "@/components/logout-button"

export default async function DashboardPage(){
    const session = await auth()
    if(!session || !session.user) {
        redirect("/login")
    }
   
return <main className="container mx-auto p-4 text-black">
    <h1>Dashboard</h1>
    <p>Welcome {session.user.name}</p>
    <LogoutButton />
    </main>
}