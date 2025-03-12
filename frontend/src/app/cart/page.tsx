"use client";
import { useEffect, useState } from "react";
import { Button, Table } from "flowbite-react";
import { useRouter } from "next/navigation";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default async function cartList() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Obtener el carrito de localStorage
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const handleCheckout = () => {
    localStorage.removeItem("cart"); // Limpiar carrito
    setCart([]); // Actualizar estado
    alert("Compra finalizada con éxito 🎉");
    router.push("/"); // Redirigir al home o a una página de confirmación
  };

  return (
    <main className="flex-grow pt-[4rem] container mx-auto p-6">
      <h2 className="text-3xl text-primary p-10 font-bold text-center mb-6">Carrito de Compras</h2>

      {cart.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.HeadCell>Producto</Table.HeadCell>
              <Table.HeadCell>Cantidad</Table.HeadCell>
              <Table.HeadCell>Precio</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {cart.map((item) => (
                <Table.Row key={item.id} className="bg-white">
                  <Table.Cell className="font-medium">{item.name}</Table.Cell>
                  <Table.Cell>{item.quantity}</Table.Cell>
                  <Table.Cell>${item.price * item.quantity}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">Tu carrito está vacío.</p>
      )}

      {cart.length > 0 && (
        <div className="flex justify-center mt-6">
          <Button color="success" onClick={handleCheckout}>
            Finalizar compra
          </Button>
        </div>
      )}
    </main>
  );
}
