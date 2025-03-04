import React from "react";


export default function Header() {
    return (
        <header className="bg-[#ffffff] p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-5xl text-[#FFBA05] font-size: var(--text-2xl) font-lobster font-bold;">
                    <a href="/">Foody</a>
                </h1>
                <nav>
                    <ul className="flex space-x-6">
                    <li><a href="/login" className="text-[#f5750c]">Inicia Sesión</a></li>
                    <li><a href="/registro" className="text-[#f5750c]">Regístrate</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
};
