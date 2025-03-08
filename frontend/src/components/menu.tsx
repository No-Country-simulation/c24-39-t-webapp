"use client";

import { useEffect, useState } from "react";
import { MenuProduct, Product } from "@/utils/types";
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent } from "flowbite-react";
import { HiShoppingCart } from "react-icons/hi";
import { Dropdown } from "flowbite-react";
import MenuItem from "./menu-item";

type MenuProps = {
  menu: MenuProduct[];
};

export default function Menu({ menu }: MenuProps) {
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
          <Dropdown.Item className="text-center font-bold cursor-pointer">
            Finalizar compra
          </Dropdown.Item>
        </Dropdown>
      </div>

      {/* Lista de productos */}
      <Accordion>
        {menu.map((item, index) => (
          <AccordionPanel key={item.categoryId + index}>
            <AccordionTitle>
              <div className="flex gap-6 items-center justify-between">
                <h3 className="text-lg">{item.categoryName}</h3>
                <div className="flex justify-center items-center gap-1">
                  <span className="font-bold">{item.products.length}</span> Productos
                </div>
              </div>
            </AccordionTitle>
            <AccordionContent>
		<div className="flex flex-col gap-2">
            {
              item.products.length > 0 && item.products.map((product) => (
                  <MenuItem key={product.prd_id} product={product} addToCart={addToCart} />
              ))
            }
		</div>
            </AccordionContent>
          </AccordionPanel>
        ))}
      </Accordion>
    </div>
  );
}
