// src/context/CartContext.tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { CartItem } from "@/utils/types";

type CartContextType = {
  carts: Record<string, CartItem[]>;
  globalCart: CartItem[];
  addToCart: (restaurantId: string, product: CartItem) => void;
  removeFromCart: (restaurantId: string, product: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [carts, setCarts] = useState<Record<string, CartItem[]>>({});
  const [globalCart, setGlobalCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCarts = localStorage.getItem("restaurantCarts");
    if (storedCarts) {
      const parsedCarts = JSON.parse(storedCarts);
      setCarts(parsedCarts);
      updateGlobalCart(parsedCarts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("restaurantCarts", JSON.stringify(carts));
    updateGlobalCart(carts);
  }, [carts]);

  const updateGlobalCart = (carts: Record<string, CartItem[]>) => {
    const combinedCart = Object.values(carts)
      .flat()
      .reduce((acc, item) => {
        const existing = acc.find((i) => i.id === item.id);
        if (existing) {
          existing.quantity += item.quantity;
          return acc;
        }
        return [...acc, { ...item }];
      }, [] as CartItem[]);
    setGlobalCart(combinedCart);
  };

  const addToCart = (restaurantId: string, product: CartItem) => {
    setCarts((prevCarts) => {
      const restaurantCart = prevCarts[restaurantId] || [];
      const existingProduct = restaurantCart.find((item) => item.id === product.id);
      let updatedRestaurantCart;

      if (existingProduct) {
        updatedRestaurantCart = restaurantCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedRestaurantCart = [...restaurantCart, { ...product, quantity: 1 }];
      }

      return {
        ...prevCarts,
        [restaurantId]: updatedRestaurantCart,
      };
    });
  };

  const removeFromCart = (restaurantId: string, product: number) => {
    setCarts((prevCarts) => {
      const restaurantCart = prevCarts[restaurantId] || [];
      const updatedRestaurantCart = restaurantCart
        .map((item) =>
          item.id === product
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0);

      return {
        ...prevCarts,
        [restaurantId]: updatedRestaurantCart.length > 0 ? updatedRestaurantCart : [],
      };
    });
  };

  const clearCart = () => {
    setCarts({}); // Vacía el estado del carrito
    if (typeof window !== "undefined") {
      localStorage.setItem("carts", JSON.stringify({})); // Vacía el localStorage
    }
  };

  return (
    <CartContext.Provider value={{ carts, globalCart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};