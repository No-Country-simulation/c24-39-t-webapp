"use client"

import {signOut} from "next-auth/react"
 
export default function LogoutButton() {
    return <button 
        onClick={()=> signOut({redirectTo: "/login"})}
        className="bg-transparent :hover:bg-gray-200/50 transition-opacity text-black">
        Cerrar sesión
    </button>
}