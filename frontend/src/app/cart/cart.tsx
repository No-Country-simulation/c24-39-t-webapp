"use client";

import { NavbarBrand, Dropdown } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import imageShoppingCart from "../../../public/shopping-cart.png";

export default function Cart() {
  const router = useRouter();
  const [cart, setCart] = useState<{ id: number; name: string; price: number; quantity: number }[]>([]);

  // ✅ Cargar carrito desde localStorage
  useEffect(() => {
    const loadCart = () => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      } else {
        setCart([]);
      }
    };

    loadCart();
    window.addEventListener("storage", loadCart);
    return () => window.removeEventListener("storage", loadCart);
  }, []);

  // ✅ Calcular total de productos en el carrito
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <NavbarBrand>
      <div className="relative">
        {/* 🔹 Imagen como ícono del carrito */}
        <Dropdown
          label={
            <Image src={imageShoppingCart} alt="Carrito de compras" width={36} height={36} className="cursor-pointer" />
          }
          inline
        >
          <Dropdown.Header>
            <span className="block text-sm font-semibold">Carrito ({totalItems})</span>
          </Dropdown.Header>
          {cart.length > 0 ? (
            cart.map((product) => (
              <Dropdown.Item key={product.id} className="flex justify-between">
                <span>
                  {product.name} ({product.quantity}) - ${product.price * product.quantity}
                </span>
              </Dropdown.Item>
            ))
          ) : (
            <Dropdown.Item disabled>Tu carrito está vacío</Dropdown.Item>
          )}
          <Dropdown.Divider />
          <Dropdown.Item className="text-center font-bold cursor-pointer" onClick={() => router.push("/cart")}>
            Finalizar compra
          </Dropdown.Item>
        </Dropdown>

        {/* 🔴 Badge con cantidad de productos en el carrito */}
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
            {totalItems}
          </span>
        )}
      </div>
    </NavbarBrand>
  );
}
