"use client"

import {signOut} from "next-auth/react"
 
export default function LogoutButton() {
    return <button 
        onClick={()=> signOut({redirectTo: "/"})}
        className="bg-transparent :hover:bg-gray-200/40 transition-opacity text-black text-sm pl-4">
        Cerrar sesión
    </button>
}
