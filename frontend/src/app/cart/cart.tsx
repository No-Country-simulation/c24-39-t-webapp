"use client";

import { useRouter } from "next/navigation";
import imageShoppingCart from "../../../public/shopping-cart.png";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { CartItem } from "@/utils/types";

export default function Cart() {
    const router = useRouter();
    const { globalCart } = useCart();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const [cartCounter, setCartCounter] = useState("0");
    // Calcula el total de ítems en el carrito global
    const cartCounter = globalCart.reduce((total: number, item: CartItem) => total + item.quantity, 0);

    const handleClick = () => {
        router.push("/cart");
    };

    return (
            <div className="relative cursor-pointer mr-4 mt-4" onClick={handleClick}>
                <Image src={imageShoppingCart.src} alt="Carrito de compras" className="w-9 h-7" width={300} height={300}/>
                <span className="absolute -top-1 -right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {cartCounter}
                </span>
            </div>
    );
}
// function useCart(): { globalCart: any; } {
//     throw new Error("Function not implemented.");
// }

