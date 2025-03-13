"use client";

import { useEffect, useState } from "react";
import { MenuProduct, Product } from "@/utils/types";
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent } from "flowbite-react";
import { HiShoppingCart } from "react-icons/hi";
import { Dropdown } from "flowbite-react";
import MenuItem from "./menu-item";
import ProductModal from "./product-modal";
import { toast, ToastContainer } from "react-toastify";
import { useCart } from "@/context/CartContext";
import { useParams, useRouter } from "next/navigation";
// import { set } from "zod";

type MenuProps = {
  menu: MenuProduct[];
};

export default function Menu({ menu }: MenuProps) {
  // const [cart, setCart] = useState<{ id: number; name: string; price: number; quantity: number }[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // Estado para el producto seleccionado
  const { carts, addToCart, removeFromCart } = useCart();
  const params = useParams();
  const restaurantId = params?.id ? params.id : null;
  const cart = carts[restaurantId as string] || []; // Carrito específico del restaurante
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
  const [isLoading, setIsLoading] = useState(false);
  const [toastConfig, setToastConfig] = useState<{ type: "success" | "info"; message: string } | null>(null); // Estado estructurado
  const router = useRouter();

  // ✅ Mostrar toast según el tipo
  useEffect(() => {
    if (toastConfig) {
      if (toastConfig.type === "success") {
        toast.success(toastConfig.message);
      } else {
        toast.info(toastConfig.message);
      }
      setToastConfig(null); // Limpiar después de mostrar
    }
  }, [toastConfig]);

  // ✅ Agregar producto al carrito
  // const addToCart = (product: Product) => {
  //   setCart((prevCart) => {
  const handleAddToCart = (product: Product) => {
    setIsLoading(true);
    const existingProduct = cart.find((item) => item.id === product.prd_id);
    const isNewProduct = !existingProduct;

    setToastConfig({
      type: "success",
      message: isNewProduct ? `"${product.name}" añadido al carrito.` : `Otra unidad de "${product.name}" añadida.`,
    });

    addToCart(restaurantId as string, {
      id: product.prd_id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
    setIsLoading(false);
  };

  // ✅ Quitar producto del carrito
  const handleRemoveFromCart = (product: Product) => {
    setIsLoading(true);
    const prevCart = cart;
    removeFromCart(restaurantId as string, product.prd_id);

    const updatedCart = carts[restaurantId as string] || []; // Obtiene el carrito actualizado después de la modificación

    if (updatedCart.length < prevCart.length) {
      setToastConfig({
        type: "info",
        message: `Se eliminó ${product.name} del carrito.`,
      });
    } else if (updatedCart && updatedCart.length > 1) {
      setToastConfig({
        type: "info",
        message: `Se redujo la cantidad de ${product.name} a ${updatedCart.length - 1}.`, // Más detalle
      });
    }
    setIsLoading(false);
    return updatedCart;
  };
  // ✅ Abrir modal con el producto seleccionado
  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // ✅ Cerrar modal
  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
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
          <Dropdown.Item className="text-center font-bold cursor-pointer">Finalizar compra</Dropdown.Item>
        </Dropdown>
      </div>

      {/* Lista de productos */}
      <Accordion>
        {menu.map((item, index) => {
          // Filtra productos duplicados
          const uniqueProducts = item.products.filter(
            (product, index, self) => index === self.findIndex((p) => p.prd_id === product.prd_id)
          );
          console.log("Productos únicos:", uniqueProducts);
          if (isLoading) return <div key="loading">Cargando...</div>;
          return (
            <AccordionPanel key={`${item.categoryId}_${index}`}>
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
                  {uniqueProducts.length > 0 &&
                    uniqueProducts.map((product) => (
                      <MenuItem
                        key={`${item.categoryId}_${product.prd_id}`} // Clave compuesta
                        product={product}
                        cart={cart}
                        handleAddToCart={handleAddToCart}
                        handleRemoveFromCart={handleRemoveFromCart}
                        openModal={openModal} // Pasamos la función para abrir el modal
                      />
                    ))}
                </div>
              </AccordionContent>
            </AccordionPanel>
          );
        })}
      </Accordion>
      <div className="flex justify-end">
        <button
          onClick={() => router.push("/cart")}
          className="flex items-end bg-green-500 text-white m-4 px-3 py-1 rounded hover:bg-green-700 transition"
        >
          Finalizar compra
        </button>
      </div>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={closeModal}
          handleAddToCart={handleAddToCart}
          handleRemoveFromCart={handleRemoveFromCart}
        />
      )}
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}
