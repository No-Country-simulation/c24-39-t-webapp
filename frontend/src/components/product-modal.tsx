// src/components/ProductModal.tsx
"use client"; 

import { Modal } from "flowbite-react";
import { Product } from "../utils/types";
import Image from "next/image";
import React from "react";
// import router from "next/router";
import { useRouter } from "next/navigation"; // Correcto para App Router

// Define las props del modal
type ProductModalProps = {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  handleAddToCart: (product: Product) => void;
  handleRemoveFromCart: (product: Product) => void;
};

export default function ProductModal({
  product,
  isOpen,
  onClose,
  handleAddToCart,
  handleRemoveFromCart
}: ProductModalProps) {
  const router = useRouter();

  if (!product) return null;
  return (
    <Modal show={isOpen} onClose={onClose} >
      <Modal.Header>{product.name}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={300}
            className="object-cover w-full"
          />
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {product.description}
          </p>
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Precio: ${product.price}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <button
          onClick={onClose}
          className="bg-orange-400 text-white px-3 py-1 rounded hover:bg-orange-600 transition"
        >
          Cerrar
        </button>
        <button
          onClick={() => handleAddToCart(product)}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
        >
          Agregar
        </button>
        <button
          onClick={() => handleRemoveFromCart(product)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
        >
          Eliminar
        </button>
        <button
          onClick={() => router.push("/cart")}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 transition"
        >
          Comprar
        </button>
      </Modal.Footer>
    </Modal>
  );
}