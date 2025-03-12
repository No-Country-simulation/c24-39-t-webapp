"use client";

import { useEffect, useState } from "react";
import { MenuProduct, Product } from "@/utils/types";
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent } from "flowbite-react";
import { HiShoppingCart } from "react-icons/hi";
import { Dropdown } from "flowbite-react";
import MenuItem from "./menu-item";
import ProductModal from "./product-modal";
import { toast, ToastContainer } from "react-toastify";

type MenuProps = {
  menu: MenuProduct[];
};

export default function Menu({ menu }: MenuProps) {
  const [cart, setCart] = useState<{ id: number; name: string; price: number; quantity: number }[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // Estado para el producto seleccionado
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
  const [isLoading, setIsLoading] = useState(false);
  const [toastConfig, setToastConfig] = useState<{ type: "success" | "info"; message: string } | null>(null); // Estado estructurado

  // ✅ Cargar carrito desde localStorage
  useEffect(() => {
    console.log("Carrito 1 en localStorage:", cart);
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    setIsLoading(false);
  }, []);

  // ✅ Guardar carrito en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

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
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.prd_id);
      const isNewProduct = !existingProduct;

      setToastConfig({
        type: "success",
        message: isNewProduct
          ? `"${product.name}" añadido al carrito.`
          : `Otra unidad de "${product.name}" añadida.`
      });

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.prd_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, {
        id: product.prd_id,
        name: product.name,
        price: product.price,
        quantity: 1
      }];
    });
  };

  // ✅ Quitar producto del carrito
  const removeFromCart = (product: Product) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item.id === product.prd_id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);

      if (updatedCart.length < prevCart.length) {
        setToastConfig({
          type: "info",
          message: `Se eliminó ${product.name} del carrito.`
        });
      } else if (updatedCart && updatedCart.length > 1) {
        setToastConfig({
          type: "info",
          message: `Se redujo la cantidad de ${product.name} a ${updatedCart.length - 1}.` // Más detalle
        });
      }
      return updatedCart;
    });
  };
  // ✅ Abrir modal con el producto seleccionado
  const openModal = (product: Product) => {
    console.log("Abriendo modal para:", product.prd_id);
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
          <Dropdown.Item className="text-center font-bold cursor-pointer">
            Finalizar compra
          </Dropdown.Item>
        </Dropdown>
      </div>

      {/* Lista de productos */}
      <Accordion>
        {menu.map((item, index) => {
          // Filtra productos duplicados
          const uniqueProducts = item.products.filter(
            (product, index, self) =>
              index === self.findIndex((p) => p.prd_id === product.prd_id)
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
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                        openModal={openModal} // Pasamos la función para abrir el modal
                      />
                    ))}
                </div>
              </AccordionContent>
            </AccordionPanel>
          );
        })}
      </Accordion>
      {/* Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={closeModal}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      )}
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}