"use client";

import { useEffect, useState } from "react";
import { Product } from "@/utils/types";
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent } from "flowbite-react";
import { HiShoppingCart } from "react-icons/hi";
import { Dropdown } from "flowbite-react";

type MenuProps = {
  products: Product[];
};

export default function Menu({ products }: MenuProps) {
  const [cart, setCart] = useState<{ id: number; name: string; price: number }[]>([]);

  // ✅ Cargar carrito desde localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  // ✅ Guardar carrito en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ Agregar producto al carrito
  const addToCart = (product: Product) => {
    const newCart = [...cart, { id: product.prd_id, name: product.name, price: product.price }];
    setCart(newCart);
  };

  return (
    <div>
      {/* Carrito con Flowbite */}
      <div className="absolute top-4 right-4 w-80 ">
        <Dropdown label={<HiShoppingCart className="size-6" />} inline>
          <Dropdown.Header>
            <span className="block text-sm font-semibold">Carrito</span>
          </Dropdown.Header>
          {cart.length > 0 ? (
            cart.map((product) => (
              <Dropdown.Item key={product.id}>
                {product.name} - ${product.price}
              </Dropdown.Item>
            ))
          ) : (
            <Dropdown.Item disabled>Tu carrito está vacío</Dropdown.Item>
          )}
          <Dropdown.Divider />
          <Dropdown.Item className="text-center font-bold cursor-pointer">Finalizar compra</Dropdown.Item>
        </Dropdown>
      </div>

      {/* Lista de productos */}
      <Accordion>
        {products.map((product) => (
          <AccordionPanel key={product.prd_id}>
            <AccordionTitle>
              <div className="flex gap-6 items-center justify-between">
                <h3 className="text-lg">{product.name}</h3>
                <span className="font-bold">${product.price}</span>
              </div>
            </AccordionTitle>
            <AccordionContent>
		<div className="flex justify-between items-center w-full">
              <div className="flex gap-2 items-center">
                <img src={product.image} alt={product.name} className="object-cover w-[10%]" />
                <p><span className="text-black/70">{product.description}</span> - <span className="font-semibold text-green-700/90">${product.price}</span></p>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="mt-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
              >
                Agregar
              </button>
	     </div>
            </AccordionContent>
          </AccordionPanel>
        ))}
      </Accordion>
    </div>
  );
}
