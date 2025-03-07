"use client";

import { NavbarBrand } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import imageShoppingCart from "../../../public/shopping-cart.png";

export default function Cart() {
    const router = useRouter();
    const [cartCounter, setCartCounter] = useState("0");

    const handleClick = () => {
        router.push("/cart");
    };

    return (
        <NavbarBrand>
            <div className="relative cursor-pointer" onClick={handleClick}>
                <img src={imageShoppingCart.src} alt="Carrito de compras" className="w-9 h-7" />
                <span className="absolute -top-1 -right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {cartCounter}
                </span>
            </div>
        </NavbarBrand>
    );
}
