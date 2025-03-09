"use client";

import { Modal } from "flowbite-react";
import { Product } from "@/utils/types";

// Define las props del modal
type ProductModalProps = {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
};

export default function ProductModal({
  product,
  isOpen,
  onClose,
}: ProductModalProps) {
  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>{product.name}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <img
            src={product.image}
            alt={product.name}
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
      <Modal.Footer>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
        >
          Cerrar
        </button>
      </Modal.Footer>
    </Modal>
  );
}