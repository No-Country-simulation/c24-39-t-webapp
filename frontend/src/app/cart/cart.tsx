"use client";

import { NavbarBrand } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import imageShoppingCart from "../../../public/shopping-cart.png";
import Image from "next/image";

export default function Cart() {
    const router = useRouter();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [cartCounter, setCartCounter] = useState("0");

    const handleClick = () => {
        router.push("/cart");
    };

    return (
        <NavbarBrand className="ml-auto md:ml-0 lg:ml-auto">
            <div className="relative cursor-pointer mr-4 mt-4" onClick={handleClick}>
                <Image src={imageShoppingCart.src} alt="Carrito de compras" className="w-9 h-7" width={300} height={300}/>
                <span className="absolute -top-1 -right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {cartCounter}
                </span>
            </div>
        </NavbarBrand>
    );
}
