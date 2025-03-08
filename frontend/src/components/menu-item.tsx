"use client";

import { Product } from "@/utils/types";
import { HiPlus, HiMinus } from "react-icons/hi";

type Props = {
  product: Product;
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  cart: { id: number; name: string; price: number; quantity: number }[];
};

export default function MenuItem({
  product,
  addToCart,
  removeFromCart,
  cart,
}: Props) {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex gap-2 items-center">
        {/* eslint-disable-next-line @next/next/no-img-element*/}
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-[10%]"
        />
        <p>
          <span className="text-black/70">{product.description}</span> -{" "}
          <span className="font-semibold text-green-700/90">
            ${product.price}
          </span>
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => removeFromCart(product)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
        >
          <HiMinus />
        </button>
        <span>
          {cart.find((item) => item.id === product.prd_id)?.quantity || 0}
        </span>
        <button
          onClick={() => addToCart(product)}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
        >
          <HiPlus />
        </button>
      </div>
    </div>
  );
}
