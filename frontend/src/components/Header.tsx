import Link from "next/link";
import React from "react";


export default function Header() {
    return (
        <header className="p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="md:text-3xl text-primary sm:text-2xl 
                    transition-opacity hover:text-primary/80 font-bold">
                    <Link href="/">Foody</Link>
                </h1>
                <nav>
                    <ul className="flex space-x-6">
                    <li><Link href="/login" className="text-[#f5750c]">Inicia Sesión</Link></li>
                    <li><Link href="/registro" className="text-[#f5750c]">Regístrate</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
};
