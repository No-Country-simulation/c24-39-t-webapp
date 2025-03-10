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
  const [cart, setCart] = useState<{ id: number; name: string; price: number; quantity: number }[]>([]);

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
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.prd_id);
      if (existingProduct) {
        return prevCart.map((item) => (item.id === product.prd_id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prevCart, { id: product.prd_id, name: product.name, price: product.price, quantity: 1 }];
    });
  };

  // ✅ Quitar producto del carrito
  const removeFromCart = (product: Product) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => (item.id === product.prd_id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0);
    });
  };
  return (
    <div>
      {/* Carrito con Flowbite */}
      <div className="absolute top-4 right-4 w-80">
        <Dropdown label={<HiShoppingCart className="size-6" />} inline>
          <Dropdown.Header>
            <span className="block text-sm font-semibold">Carrito</span>
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
          <Dropdown.Item className="text-center font-bold cursor-pointer">
            Finalizar compra
          </Dropdown.Item>
        </Dropdown>
      </div>

      {/* Lista de productos */}
      <Accordion>
        {menu.map((item, index) => (
          <AccordionPanel key={`${item.restaurantId}-${item.categoryId}-${index}`}>
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
                        item.products.length > 0 && item.products.map((product,index) => (
                            <MenuItem 
                              key={`${product.prd_id}-${index}`} 
                              product={product}  cart={cart}
                              addToCart={addToCart} removeFromCart={removeFromCart}
                            />
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
